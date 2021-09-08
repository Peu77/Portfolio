<script>
    import {registerListener} from "../../../../data/store";
    import {onMount} from "svelte";
    import CommandHandler from "../../../../data/commands/commandHandler";
    import FileHandler from "../../../../data/file/fileHandler";

    export let window
    let textInput
    let scroll
    let lines = []
    let currentPath

    function updatePath() {
        currentPath = FileHandler.getFilePath(window.uuid)
    }

    updatePath()
    registerListener("click/" + window.uuid, () => {
        select()
        scrollDown()
    })

    function select() {
        setTimeout(() => {
            textInput.focus()
        }, 0)
    }

    function scrollDown() {
        setTimeout(() => {
            scroll.scrollTop = scroll.scrollHeight
        }, 5)
    }

    const utils = {
        push: push,
        pushColor: pushColor,
        clearTerminal: clearTerminal,
        terminalUUID: window.uuid,
        updatePath: updatePath
    }

    function submit(event) {
        event.preventDefault()
        let text = textInput.value
        pushColor({type: "image", src: "right-arrow.png", class: "arrow"}, {
            text: currentPath,
            color: "white"
        }, {text: text, color: "white"})
        CommandHandler.execute(text, utils)
        textInput.value = ""
        scrollDown()
    }

    function clearTerminal() {
        lines = []
    }

    function push(text) {
        lines = [...lines, [{text: text, color: "white"}]]
    }

    function pushColor(...line) {
        lines = [...lines, [...line]]
    }

    onMount(() => {
        textInput = document.getElementsByClassName("text/" + window.uuid)[0]
        scroll = document.getElementsByClassName("scroll/" + window.uuid)[0]
        select()
    })
</script>

<div id="terminal">
    <div class="scroll scroll/{window.uuid}"
         style="max-height: {window.height - window.barHeight}px">
        <div>
            {#each lines as messages}
                <div class="line">

                    {#each messages as message}
                        {#if message.type === "text" || message.type === undefined}
                            <pre style="color: {message.color};" class="line">{message.text}</pre>
                        {:else if message.type === "image"}
                            <img src={message.src} class={message.class || ""} alt=""/>
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>

        <form on:submit={submit}
              class="inputContainer">
            <img class="arrow" src="right-arrow.png" alt="arrow"/>
            <p>{currentPath}</p>
            <input
                    on:submit={submit}
                    class="text text/{window.uuid}"
                    type="text"
                    on:blur={scrollDown}
                    autoCorrect="off"
                    autoCapitalize="none"
                    autoComplete="off">
        </form>
    </div>
</div>


<style>
    #terminal {
        height: 100%;
        overflow: hidden;
        color: white;
    }

    .line {
        display: flex;
    }

    .line * {
        margin-right: 5px;
    }

    .inputContainer {
        display: flex;
        width: 100%;
        align-content: center;

    }

    .arrow {
        max-width: 20px;
    }

    .text {
        width: 100%;
        outline: none;
        background-color: transparent;
        border: none;
        color: white;
        margin-left: 10px;
        font-weight: bold;
    }

    .scroll {
        display: flex;
        overflow: auto;
        flex-direction: column;

    }
</style>
