<script>
    import {addWindow, apps, callHooks, removeWindow, windowStore} from "../../data/store"
    import Window from "./window/Window.svelte";
    import WindowClass from "../../data/window"
    import InformationBar from "./InformationBar.svelte";

    let windows = []
    let draggingWindow
    let xDist, yDist
    let mouseX = 0, mouseY = 0
    const informationBar = 30

    windowStore.subscribe(windowsInStore => windows = windowsInStore)

    function getHoveredWindow(mouseX, mouseY, drag) {
        const hoveredWindows = windows.filter(window => window.isHover(mouseX, mouseY, drag))
        return hoveredWindows[hoveredWindows.length - 1]
    }

    document.addEventListener("keydown", event => {
        let key = event.key

        if (event.altKey) {
            event.preventDefault()

            const app = apps.find(app => app.key === key)
            if (app != null)
                addWindow(WindowClass.createFromApp(app))
        }

        if (event.shiftKey && event.altKey) {
            event.preventDefault()
            switch (key) {
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
            const newY = Math.max(informationBar, Math.min(mouseY - yDist, websiteHeight - window.height))

            window.x = newX
            window.y = newY
            callHooks("window/" + window.uuid)
        }
    })


</script>

<div id="desktop">
    <InformationBar height={informationBar}/>

    {#each windows as window, i(window.uuid)}
        <Window uuid={window.uuid}/>
    {/each}
</div>

<style>
    #desktop {
        background: url("/wallpapers/0001.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 100vw;
        height: 100vh;

        overflow: hidden;
    }
</style>