<script>
    import {addWindow, apps, getWindows, registerListener} from "../../data/store";
    import Window from "../../data/window";
    import {afterUpdate, onMount} from "svelte";

    export let height

    let isAppOpen = []

    function clickApp(app) {
        const foundWindow = getWindows().find(window => window.title === app.name)
        console.log((foundWindow))
        if (foundWindow === undefined) {
            console.log("create")
            const newWindow = Window.createFromApp(app)
            addWindow(newWindow)
        } else {
            console.log("update")
            foundWindow.isOpen = !foundWindow.isOpen
            foundWindow.updateGui()
        }
        updateOpenApps()
    }

    registerListener("updateApps", () => {
        updateOpenApps()
    })

    function updateOpenApps(){
        isAppOpen = []
        apps.forEach(app => {
            if(getWindows().find(window => window.title === app.name) !== undefined){
                isAppOpen = [...isAppOpen, app.name]
            }
        })
    }

    onMount(updateOpenApps)
</script>

<div class="taskBar" style="height: {height}px">
    {#each apps as app}
        <div class="app" on:click={() => clickApp(app)}>
            <img class="appIcon" src={app.appIconSrc} alt={app.name}>
            {#if isAppOpen.includes(app.name)}
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
    }

    .appIcon {
        min-width: 50px;
        transition: transform 0.1s;
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
</style>