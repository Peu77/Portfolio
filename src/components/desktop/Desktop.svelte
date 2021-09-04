<script>
    import {addWindow, apps, callHooks, removeWindow, windowStore} from "../../data/store"
    import Window from "./window/Window.svelte";
    import WindowClass from "../../data/window"

    let windows = []
    let draggingWindow
    let xDist, yDist
    let mouseX = 0, mouseY = 0

    windowStore.subscribe(windowsInStore => windows = windowsInStore)

    function getHoveredWindow(mouseX, mouseY, drag) {
        const hoveredWindows = windows.filter(window => window.isHover(mouseX, mouseY, drag))
        return hoveredWindows[hoveredWindows.length - 1]
    }

    document.addEventListener("keydown", event => {
        const key = event.key
        if (event.altKey) {
            event.preventDefault()

            const app = apps.find(app => app.key === event.key)
            if (app != null)
                addWindow(WindowClass.createFromApp(app))
        }

        if (event.shiftKey && event.altKey) {
            event.preventDefault()
            switch (event.key) {
                case "C":
                    const hoverWindow = getHoveredWindow(mouseX, mouseY, false)
                    if (hoverWindow != null)
                        removeWindow(hoverWindow.uuid)
                    break
            }
        }
    })
    //call on mouse release
    document.addEventListener("mouseup", event => {
        draggingWindow = undefined
        xDist = 0
        yDist = 0
    })

    document.addEventListener("mousedown", event => {
        const mouseX = event.x
        const mouseY = event.y
        const window = getHoveredWindow(mouseX, mouseY, true)

        if (window != null) {
            xDist = mouseX - window.x
            yDist = mouseY - window.y
            draggingWindow = window
        }
    })

    document.addEventListener("mousemove", (event) => {
        const window = draggingWindow

        mouseX = event.x
        mouseY = event.y
        if (window) {
            event.preventDefault()
            const websiteWidth = document.body.clientWidth
            const websiteHeight = document.body.clientHeight
            const newX = Math.max(0, Math.min(mouseX - xDist, websiteWidth - window.width))
            const newY = Math.max(0, Math.min(mouseY - yDist, websiteHeight - window.height))

            window.x = newX
            window.y = newY
            callHooks("window/" + window.uuid)
        }
    })


</script>

<div id="desktop">
    <h1>desktop</h1>
    {#each windows as window, i(window.uuid)}
        <Window uuid={window.uuid}/>
    {/each}
</div>

<style>
    #desktop {
        width: 100vw;
        height: 100vh;
        background-color: #333333;
        overflow: hidden;
    }
</style>