<script>
    import {addWindow, apps, getWindows, registerListener, windowStore} from "../../data/store";
    import Window from "../../data/window";
    import {afterUpdate, onMount} from "svelte";

    export let height

    let isAppOpen = []
    let windowsOfApps = new Map()

    function getWindowsOfApp(app) {
        return getWindows().filter(window => window.equalApp(app))
    }

    function clickApp(app) {
        if (windowsOfApps[app.name].length > 1) return
        const foundWindow = getWindows().find(window => window.equalApp(app))

        if (foundWindow === undefined) {
            const newWindow = Window.createFromApp(app)
            addWindow(newWindow)
        } else {
            foundWindow.isOpen = !foundWindow.isOpen
            if (foundWindow.isOpen)
                foundWindow.setFocus()
            foundWindow.updateGui()
        }
        updateOpenApps()
    }

    function clickWindow(window) {
        window.isOpen = true
        window.setFocus()
        window.updateGui()
    }

    registerListener("updateApps", () => {
        updateOpenApps()
        updateWindowsOfApps()
    })

    function updateOpenApps() {
        isAppOpen = []
        apps.forEach(app => {
            if (getWindows().find(window => window.equalApp(app)) !== undefined) {
                isAppOpen = [...isAppOpen, app.name]
            }
        })
    }

    function updateWindowsOfApps() {
        const newMap = new Map()
        apps.forEach(app => {
            newMap[app.name] = getWindowsOfApp(app)
        })
        windowsOfApps = newMap
    }

    onMount(() => {
        updateOpenApps()
        updateWindowsOfApps()
    })
</script>

<div class="taskBar" style="height: {height}px">
    {#each apps as app}
        <div class="app" on:click={() => clickApp(app)}>
            <img class="appIcon" src={app.appIconSrc} alt={app.name}>
            {#if isAppOpen.includes(app.name)}
                {#if windowsOfApps[app.name].length > 1 }
                    <div class="windows">
                        {#each windowsOfApps[app.name] as window}
                            <div on:click={() => clickWindow(window)} class="window">
                                <svelte:component this={window.content} window={window}/>
                            </div>
                        {/each}
                    </div>
                {/if}
                <div class="dot"></div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .taskBar {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(234, 234, 234, 0.74);
        position: absolute;
        bottom: 0;
        left: 50%;
        gap: 10px;
        transform: translateX(-50%);
        border-radius: 10px;
        padding: 0 10px;
    }

    .app {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .appIcon {
        min-width: 50px;
        transition: all 0.3s;
        transform-origin: 50% 100%;
    }

    .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #0e0e0e;
    }

    .appIcon:hover {
        transform: scale(1.3);
        margin: 0 0.5em;
    }

    .windows {
        position: absolute;
        display: none;
        gap: 20px;
        top: -250px;
        padding: 20px;
        z-index: 4000;
        justify-content: flex-start;
        align-items: center;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
        animation-name: openWindows;
        border-left: 4px #227272 solid;
        border-right: 4px #227272 solid;
        max-width: 960px;
        overflow-x: auto;

    }

    @keyframes openWindows {
        from {
            top: 0;
            transform: scale(0);
        }

        to {
            top: -250px;
            transform: scale(1);
        }
    }

    .app:hover .windows {
        display: flex;
    }

    .window {
        background-color: black;
        min-width: 300px;
        min-height: 200px;
        max-width: 300px;
        max-height: 200px;
        overflow: hidden;
        transition: all 0.3s;
        transform-origin: 50% 100%;

    }

    .window:hover {
        transform: scale(1.1);
    }

    .window p {
        color: white;
    }
</style>