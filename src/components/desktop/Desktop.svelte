<script>
    import {addWindow, apps, callHooks, removeWindow, windowStore} from "../../data/store"
    import Window from "./window/Window.svelte";
    import WindowClass from "../../data/window"
    import InformationBar from "./InformationBar.svelte";

    let windows = []
    let currentWindow
    let xDist, yDist
    let mouseX = 0, mouseY = 0
    const informationBar = 30
    let resizing = false
    let pressAlt = false

    windowStore.subscribe(windowsInStore => windows = windowsInStore)

    function getHoveredWindow(mouseX, mouseY, drag) {
        const hoveredWindows = windows.filter(window => window.isHover(mouseX, mouseY, drag))
        return hoveredWindows[hoveredWindows.length - 1]
    }

    document.addEventListener("contextmenu", event => {
        event.preventDefault()

        const hoveredWindow = getHoveredWindow(mouseX, mouseY, false)
        if (hoveredWindow !== undefined && pressAlt) {
            console.log("start resizing")
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
        if (key === "Alt")
            pressAlt = true

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
        currentWindow = undefined
        resizing = false
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
            currentWindow = window
        }
    })

    document.addEventListener("mousemove", (event) => {
        const window = currentWindow

        mouseX = event.x
        mouseY = event.y
        if (window) {
            event.preventDefault()
            const websiteWidth = document.body.clientWidth
            const websiteHeight = document.body.clientHeight
            if(resizing){
                const newWidth = Math.max(500, mouseX - window.x)
                const newHeight = Math.max(400, mouseY - window.y)

                window.width = newWidth
                window.height = newHeight
            }else{
                const newX = Math.max(0, Math.min(mouseX - xDist, websiteWidth - window.width))
                const newY = Math.max(informationBar, Math.min(mouseY - yDist, websiteHeight - window.height))

                window.x = newX
                window.y = newY
            }
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