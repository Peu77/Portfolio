<script>
    import FileHandler from "../../../../data/file/fileHandler";
    import {afterUpdate, onMount} from "svelte";

    export let window
    let width = window.width
    let currentPath = ""
    let pathInput
    let currentFile = ""
    let currentFiles = []

    function updatePath() {
        currentPath = FileHandler.getFilePath(window.uuid)
    }

    function updateCurrentFiles() {
        currentFiles = FileHandler.getFilesInCurrentDirectory(window.uuid)
    }

    updatePath()
    pathInput = currentPath

    function changePath(fileName) {
        if (currentFile === fileName)
            currentFile = ""
        else
            currentFile = fileName
    }


    onMount(() => {
        updateCurrentFiles()
    })

    afterUpdate(() => {
        updateCurrentFiles()
        width = window.width
    })
</script>
<div class="fileManager">
    <input type="text" placeholder="url" bind:value={pathInput} on:keypress={event => {
        if(event.key === "Enter"){
            const findPath = FileHandler.findPath(window.uuid, pathInput)
            const path = findPath.path
            if(findPath.exist){
                  currentPath = path
                  pathInput = path
                  FileHandler.changePath(window.uuid, path)
            }else
                pathInput = currentPath
        }
    }}/>

    <div class="files"
         on:click={() => console.log("tests")}>
        {#each currentFiles as file}
            <div class={"file " + (currentFile === file.getName() ? "current" : "")}
                 on:click={() => changePath(file.getName())}>
                <img class="icon" src={file.getIconSrc()} alt=""/>
                <p>{file.getName() }</p>
            </div>
        {/each}
    </div>
</div>


<style>
    .fileManager {
        padding: 5px;
    }

    .files {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        display: grid;
        grid-gap: 16px;
        max-height: inherit;
    }

    .file {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 5px;
        border-radius: 5px;
    }

    .current {
        background-color: rgba(155, 140, 140, 0.6);
    }

    .file .icon {
        user-select: none;
        max-width: 100%;
    }
</style>