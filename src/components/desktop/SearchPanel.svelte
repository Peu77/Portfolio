<script>
    import {apps} from "../../data/store";

    let searString = ""
</script>

<div id="black"></div>
<div class="searchPanel">
    <input type="text" placeholder="search" class="input" bind:value={searString}>
    <div class="apps">
        {#each apps.filter(app => app.name.toLowerCase().includes(searString.toLowerCase())) as app}
            <div class="searchResult">
                <p>{app.name}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    #black{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .searchPanel {
        width: 100%;
        height: 100%;
        position: absolute;
        max-width: 800px;
        max-height: 1000px;
        left: 50%;
        top: 50%;
        background-color: #111111;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        border: 4px solid #227272;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 70px;
    }

    .input{
        outline: none;
        border: none;
        padding: 5px;
        background-color: transparent;
        font-size: 20px;
        border-bottom: 2px solid #227272;
        color: white;
        width: 100%;
    }

    .searchResult{
        font-size: 20px;
        color: white;
    }
</style>