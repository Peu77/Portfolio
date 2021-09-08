<script>
    import WindowBar from "./WindowBar.svelte";
    import {callHooks, getWindow, registerListener, windowStore} from "../../../data/store";
    import { fade, fly } from "svelte/transition";

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
     style={"width: " + window.width + "px; height: " + window.height +"px; left: " + window.x + "px; top: " +window.y + "px;" + (window.moving ? "transition: none" : "")}>
    <WindowBar title={window.title} height={window.barHeight}/>
    <svelte:component this={window.content} window={window}/>
</div>

<style>
    #window {
        position: absolute;
        background-color: rgba(28, 28, 28, 0.84);
        border-radius: 0.5em;
        overflow: hidden;
        transition: width 0.2s, height 0.2s, left 0.2s, top 0.2s;
    }

    #window:hover {

    }
</style>