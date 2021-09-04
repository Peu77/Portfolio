<script>
    import WindowBar from "./WindowBar.svelte";
    import {callHooks, getWindow, registerListener, windowStore} from "../../../data/store";
    import { fade } from "svelte/transition";

    export let uuid
    let window

    function updateWindow() {
        const newWindow = getWindow(uuid)
        if (newWindow)
            window = newWindow
    }

    function onWindowClick() {
        callHooks("click/" + window.uuid)

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
     in:fade={{delay: 5, duration: 200}} out:fade={{delay: 5, duration: 100}}
     on:mousedown={onWindowClick}
     style="
        width: {window.width}px;
        height: {window.height}px;
        left: {window.x}px;
        top: {window.y}px;
">
    <WindowBar title={window.title} height={window.barHeight}/>
    <svelte:component this={window.content} window={window}/>
</div>

<style>
    #window {
        position: absolute;
        background-color: #1c1c1c;
        border-radius: 0.5em;
        overflow: hidden;
    }

    #window:hover {

    }
</style>