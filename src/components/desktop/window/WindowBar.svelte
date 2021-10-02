<script>
    import {removeWindow} from "../../../data/store";

    export let window
</script>

<div id="container" style="height: {window.barHeight}px">
    <div id="windowBar">
        <p id="title">{window.title}</p>
    </div>


    <div class="actions" style="width: {window.actionWidth}px">
        <div class="minimize" on:click={() => {
             window.isOpen = !window.isOpen
             window.updateGui()
        }}></div>
        <div class="toggle"></div>
        <div class="close" on:click={() => removeWindow(window.uuid)}></div>
    </div>
</div>

<style>
    #container{
        display: flex;
        background-color: #227272;
    }

    #windowBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: #227272;
        cursor: pointer;
        transition: background-color 0.1s linear;
    }

    #windowBar:hover {
        background-color: #1c5b5b;
    }

    #title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-weight: bold;
        display: block;
        color: white;
    }

    .actions {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        gap: 5px;
    }

    .actions * {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        cursor: pointer;
    }

    .actions *:hover{
        filter: brightness(60%);
    }

    .close {
        background-color: red;
    }

    .toggle {
        background-color: orange;
    }

    .minimize {
        background-color: yellow;
    }
</style>