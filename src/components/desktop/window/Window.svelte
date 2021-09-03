<script>
    export let window
</script>

<div id="window" style="
width: {window.width}px;
height: {window.height}px;
">
    <svelte:component this={window.content}/>
</div>

<style>
    #window {
        position: absolute;
        background-color: #1c1c1c;
        box-shadow: 5px 10px 18px #3b3a3a;
    }

    #window:hover {
        border: 2px solid #2a2aad;
    }
</style>