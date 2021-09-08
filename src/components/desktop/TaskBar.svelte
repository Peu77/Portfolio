<script>
    import {addWindow, apps} from "../../data/store";
    import Window from "../../data/window";

    export let height

    function clickApp(app){
        const newWindow = Window.createFromApp(app)
        addWindow(newWindow)
    }
</script>

<div class="taskBar" style="height: {height}px">
    {#each apps as app}
        <div class="app" on:click={() => clickApp(app)}>
            <img class="appIcon" src={app.appIconSrc} alt={app.name}>
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

    .app{
        cursor: pointer;
    }

    .appIcon{
        min-width: 50px;
        transition: transform 0.1s;
        transition: all 0.3s;
        transform-origin: 50% 100%;
    }

    .appIcon:hover{
        transform: scale(1.3);
        margin: 0 0.5em;
    }
</style>