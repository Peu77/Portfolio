<script>
    import {windowStore} from "../../data/store"
    import Window from "./window/Window.svelte";

    let windows = []
    windowStore.subscribe(windowsInStore => windows = windowsInStore)

</script>

<div id="desktop">
    <h1>desktop</h1>
    {#each windows as window}
        <Window window={window}/>
    {/each}
</div>

<style>
    #desktop {
        width: 100vw;
        height: 100vh;
        background-color: #333333;
    }
</style>