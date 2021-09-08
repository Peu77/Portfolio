<script>
    import {
        addWindow,
        apps,
        callHooks,
        closeContextMenu,
        currentContextMenu,
        removeWindow,
        windowStore
    } from "../../data/store"
    import Window from "./window/Window.svelte";
    import WindowClass from "../../data/window"
    import InformationBar from "./InformationBar.svelte";
    import ContextMenu from "./ContextMenu.svelte";
    import SearchPanel from "./SearchPanel.svelte";
    import TaskBar from "./TaskBar.svelte";

    let windows = []
    let currentWindow
    let xDist, yDist
    let mouseX = 0, mouseY = 0
    const informationBarHeight = 30
    const taskBarHeight = 70
    let resizing = false
    let pressAlt = false
    let lastKey = ""
    let searchPanel = false

    let currentContext = {}

    currentContextMenu.subscribe(value => currentContext = value)

    windowStore.subscribe(windowsInStore => windows = windowsInStore)

    function getHoveredWindow(mouseX, mouseY, drag) {
        const hoveredWindows = windows.filter(window => window.isHover(mouseX, mouseY, drag))
        return hoveredWindows[hoveredWindows.length - 1]
    }

    document.addEventListener("contextmenu", event => {
        event.preventDefault()

        const hoveredWindow = getHoveredWindow(mouseX, mouseY, false)
        if (hoveredWindow !== undefined && pressAlt) {
            currentWindow = hoveredWindow
            resizing = true
        }
    })

    document.addEventListener("keyup", event => {
        if (event.key === "Alt")
            pressAlt = false
    })

    document.addEventListener("keydown", event => {
        let key = event.key

        if (key === "Escape")
            searchPanel = false

        if (key === "Alt")
            pressAlt = true

        if (searchPanel)
            return

        if (event.altKey) {
            event.preventDefault()

            const app = apps.find(app => app.key === key)
            if (app != null)
                addWindow(WindowClass.createFromApp(app))
        }

        if (event.shiftKey && event.altKey) {
            event.preventDefault()
            const hoverWindow = getHoveredWindow(mouseX, mouseY, false)
            if (hoverWindow != null)
                switch (key) {
                    case "C":
                        removeWindow(hoverWindow.uuid)
                        break
                    case "J":
                        hoverWindow.setLeft(informationBarHeight, taskBarHeight)
                        hoverWindow.updateGui()
                        break
                    case "K":
                        hoverWindow.setRight(informationBarHeight, taskBarHeight)
                        hoverWindow.updateGui()
                        break
                    case "F":

                        if (hoverWindow.fullscreen)
                            hoverWindow.setToCenter()
                        else
                            hoverWindow.setFullscreen(informationBarHeight, taskBarHeight)

                        hoverWindow.fullscreen = !hoverWindow.fullscreen

                        hoverWindow.updateGui()
                        break
                }
            return
        }

        if (lastKey === "Shift" && key === "Shift" && !event.altKey && event.shiftKey) {
            searchPanel = true
            lastKey = ""
            return
        }

        lastKey = key
    })
    document.addEventListener("click", () => {
        closeContextMenu()
    })
    //call on mouse release
    document.addEventListener("mouseup", event => {
        if (currentWindow !== undefined && currentWindow !== null) {
            currentWindow.moving = false
            currentWindow.updateGui()
            currentWindow = undefined
        }

        resizing = false
        xDist = 0
        yDist = 0
    })

    document.addEventListener("mousedown", event => {
        if (searchPanel)
            return
        const mouseX = event.x
        const mouseY = event.y
        const window = getHoveredWindow(mouseX, mouseY, true)

        if (window != null) {
            xDist = mouseX - window.x
            yDist = mouseY - window.y
            currentWindow = window
        }
    })

    document.addEventListener("mousemove", (event) => {
        if (searchPanel)
            return
        const window = currentWindow

        mouseX = event.x
        mouseY = event.y
        if (window) {
            event.preventDefault()
            const websiteWidth = document.body.clientWidth
            const websiteHeight = document.body.clientHeight
            if (resizing) {
                const newWidth = Math.max(500, mouseX - window.x)
                const newHeight = Math.max(400, mouseY - window.y)

                window.width = newWidth
                window.height = newHeight
                window.fullscreen = false
            } else {
                const newX = Math.max(0, Math.min(mouseX - xDist, websiteWidth - window.width))
                const newY = Math.max(informationBarHeight, Math.min(mouseY - yDist, websiteHeight - taskBarHeight - window.height))

                window.x = newX
                window.y = newY
            }
            window.moving = true
            window.updateGui()
        }
    })


</script>

<div id="desktop">
    <InformationBar height={informationBarHeight}/>
    <TaskBar height={taskBarHeight}/>
    {#each windows as window, i(window.uuid)}
        <Window uuid={window.uuid}/>
    {/each}

    <ContextMenu data={currentContext}/>

    {#if searchPanel}
        <SearchPanel close={() => searchPanel = false}/>
    {/if}
</div>

<style>
    #desktop {
        background: url("/wallpaper.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
</style>