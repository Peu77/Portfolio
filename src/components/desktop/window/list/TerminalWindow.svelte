<script>
    import {registerListener} from "../../../../data/store";
    import {onMount} from "svelte";

    export let window
    let textInput
    let scroll
    let lines = []

    registerListener("click/" + window.uuid, () => {
        select()
        scrollDown()
    })

    function select() {
        setTimeout(() => {
            textInput.focus()
        }, 0)
    }

    function scrollDown(){
        setTimeout(() => {
            scroll.scrollTop = scroll.scrollHeight + 20
        }, 5)
    }

    function submit(event) {
        event.preventDefault()
        let text = textInput.value
        lines = [...lines, text]
        textInput.value = ""
        scrollDown()
    }

    onMount(() => {
        textInput = document.getElementById("text/" + window.uuid)
        scroll = document.getElementById("scroll/" + window.uuid)
        select()
    })
</script>

<div id="terminal">
    <div id="scroll/{window.uuid}" class="scroll"
         style="max-height: {window.height - window.barHeight}px">
        <div>
            {#each lines as line}
                <p class="line">{line}</p>
            {/each}
        </div>

        <form on:submit={submit}
              id="inputContainer">
            <img class="arrow" src="right-arrow.png" alt="arrow"/>
            <input
                    on:submit={submit}
                    class="text"
                    id="text/{window.uuid}"
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

    #inputContainer {
        display: flex;
        width: 100%;

    }

    #inputContainer .arrow {
        max-width: 20px;
    }

    .text {
        width: 100%;
        outline: none;
        background-color: transparent;
        border: none;
        color: white;
    }

    .scroll {
        display: flex;
        overflow: auto;
        flex-direction: column;

    }
</style>