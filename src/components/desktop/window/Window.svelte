<script>
    import WindowBar from "./WindowBar.svelte";
    import {getWindow, registerListener, windowStore} from "../../../data/store";

    export let uuid
    let window

    function updateWindow() {
        const newWindow = getWindow(uuid)
        if (newWindow)
            window = newWindow
    }

    function onWindowClick() {
        windowStore.update(currentWindows => {
            const newList = currentWindows.filter(it => it !== window)
            newList.push(window)
            return newList
        })
    }

    updateWindow()

    registerListener("window/" + uuid, () => {
        updateWindow()
    })
</script>

<div id="window"
     on:mousedown={onWindowClick}
     style="
        width: {window.width}px;
        height: {window.height}px;
        left: {window.x}px;
        top: {window.y}px;
">
    <WindowBar height={window.barHeight}/>
    <svelte:component this={window.content}/>
</div>

<style>
    #window {
        position: absolute;
        background-color: #1c1c1c;
        box-shadow: 5px 10px 18px #3b3a3a;
        border-radius: 20px;
        overflow: hidden;
    }

    #window:hover {
        border: 2px solid #2a2aad;
    }
</style>