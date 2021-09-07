<script>
    export let data
</script>

{#if data.menu.open}
    <div class="contextMenu" id="contextMenu" style="left: {data.menu.x}px; top: {data.menu.y}px;">
        {#each data.menuList as menu}
            <div on:click={menu.function} class="menuItem">
                <p>{menu.name}</p>
            </div>
        {/each}
    </div>
{/if}

<style>
    .contextMenu {
        position: absolute;
        border-radius: 5px;
        background-color: #0e0e0e;
        overflow: hidden;
    }

    .menuItem {
        padding: 10px;
        font-size: 20px;
        color: white;
        cursor: pointer;
        user-select: none;
    }

    .menuItem:hover {
        background-color: #227272;
    }
</style>