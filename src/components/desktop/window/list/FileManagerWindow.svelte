<script>
    import FileHandler from "../../../../data/file/fileHandler";
    import {onMount} from "svelte";
    import {addWindow, getAppByName, updateDataOfContextMenu} from "../../../../data/store";
    import Window from "../../../../data/window";

    export let window
    let currentPath = ""
    let pathInput
    let currentFile = ""
    let lastPath = []
    let currentFiles = []
    let fileClickTime = new Map()

    const dirArgument = window.getArgument("-dir")
    if (dirArgument !== undefined && dirArgument.value !== undefined) {
        const foundPath = FileHandler.findPath(window.terminalUUID, dirArgument.value)
        setPath(foundPath.path)
    }

    FileHandler.files.subscribe(files => {
        updateCurrentFiles()
    })

    function updatePath() {
        currentPath = FileHandler.getFilePath(window.uuid)
    }

    function updateCurrentFiles() {
        currentFiles = FileHandler.getFilesInCurrentDirectory(window.uuid)
    }

    updatePath()
    pathInput = currentPath
    lastPath = [...lastPath, currentPath]

    function onClickFile(fileName) {
        let doubleClick = false
        if (fileClickTime[fileName] === undefined)
            fileClickTime[fileName] = Date.now()
        else {
            if (Date.now() - fileClickTime[fileName] < 250)
                doubleClick = true

            fileClickTime[fileName] = Date.now()
        }

        if (doubleClick) {
            openFolder(fileName)
        } else {
            if (currentFile === fileName)
                currentFile = ""
            else
                currentFile = fileName
        }
    }

    function openFolder(folderName) {
        const findPath = FileHandler.findPath(window.uuid, folderName)
        if (findPath.exist) {
            const path = findPath.path
            setPath(path)
        }
    }

    function onRightClickFile(filePath, fileName, x, y) {
        updateDataOfContextMenu([
            {
                name: "delete",
                function: () => console.log("delete " + fileName)
            },
            {
                name: "open",
                function: () => openFolder(fileName)
            }, {
                name: "open in new Window",
                function: () => {
                    const newWindow = Window.createFromApp(getAppByName("File Manager"))
                    addWindow(newWindow)
                    const uuid = newWindow.uuid
                    FileHandler.changePath(uuid, FileHandler.findPath(uuid, filePath).path)
                }
            }
        ], x, y)
        currentFile = fileName
    }

    function pathBack() {
        setPath(lastPath[lastPath.length - 1])
        lastPath = lastPath.pop()
    }

    function setPath(newPath) {
        lastPath = [...lastPath, currentPath]
        currentPath = newPath
        pathInput = newPath
        FileHandler.changePath(window.uuid, newPath)
        updateCurrentFiles()
    }

    onMount(
        updateCurrentFiles
    )


</script>
<div class="fileManager">
    <div class="inputs">
        <img class="backButton" on:click={pathBack} src="left-arrow.svg" alt="back-button"/>
        <input class="input" type="text" placeholder="url" bind:value={pathInput} on:keypress={event => {
        if(event.key === "Enter"){
            const findPath = FileHandler.findPath(window.uuid, pathInput)
            const path = findPath.path
          setPath(path)
        }
    }}/>
    </div>

    <div class="files">
        {#each currentFiles as file}
            <div class={"file " + (currentFile === file.getName() ? "current" : "")}
                 on:click={() => onClickFile(file.getName())}
                 on:mousedown={event => {
                         if(event.which === 3)
                             onRightClickFile(file.name, file.getName(), event.x, event.y)
                     }}>
                <img class="icon" src={file.getIconSrc()} alt=""/>
                <p>{file.getName() }</p>
            </div>
        {/each}
    </div>
</div>


<style>
    .fileManager {
        object-fit: contain;
        max-height: 100%;
        max-width: 100%;
        padding: 5px;
        overflow: auto;
    }

    .inputs {
        display: flex;
        margin-bottom: 10px;
        padding: 5px;
        gap: 10px;

    }

    .input {
        padding: 3px;
        color: white;
        background-color: #0e0e0e;
        border-radius: 3px;
        border: none;
        outline: none;
        font-size: 20px;
    }

    .files {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        display: grid;
        grid-gap: 16px;
        margin-bottom: 20px;
    }

    .file {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 5px;
        border-radius: 5px;
        transition: background-color 0.05s;
    }

    .current {
        background-color: rgba(155, 140, 140, 0.6);
    }

    .file .icon {
        -webkit-user-drag: none;
        user-select: none;
        width: 100%;
    }

    .backButton {
        max-width: 30px;
        cursor: pointer;
        user-select: none;
        -webkit-user-drag: none;
        color: white;
        transition: filter 0.1s;
    }

    .backButton:hover {
        filter: brightness(66%);

    }
</style>