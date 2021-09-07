<script>
    import {addWindow, apps} from "../../data/store";
    import Window from "../../data/window";
    import {onMount} from "svelte";

    let searString = ""
    let foundApps = []
    let currentIndex = 0
    export let close

    function onKeyPress(event) {
        const key = event.key
        switch (key) {
            case "ArrowUp":
                if (currentIndex > 0)
                    currentIndex--
                break
            case "ArrowDown":
                if (currentIndex < foundApps.length - 1)
                    currentIndex++
                break
            case "Enter":
                const selectedApp = foundApps[currentIndex]
                if (selectedApp != null) {
                    const newWindow = Window.createFromApp(selectedApp)
                    addWindow(newWindow)
                    close()
                }
                break
        }
    }

    $: {
        foundApps = apps.filter(app => app.name.toLowerCase().includes(searString.toLowerCase()))
        const maxLength = foundApps.length - 1

        if (currentIndex > maxLength) {
            currentIndex = 0
        }
    }

    onMount(() => {
        setTimeout(() => {
            document.getElementById("input").focus()
        }, 0)
    })
</script>

<svelte:window on:keyup={onKeyPress}/>
<div id="black"></div>
<div class="searchPanel">
    <input type="text"
           placeholder="search"
           class="input"
           id="input"
           bind:value={searString}
           onblur="this.focus()"
           autoCorrect="off"
           autoCapitalize="none"
           autoComplete="off"
    >

    <div class="apps">
        {#each foundApps as app, i}
            <div on:click={() => currentIndex = i}
                 class={"searchResult " + (i === currentIndex? "current" : "")}>
                <p>{app.name}</p>
                <p>{app.description}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    #black {
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

    .input {
        outline: none;
        border: none;
        padding: 5px;
        background-color: transparent;
        font-size: 20px;
        border-bottom: 2px solid #227272;
        color: white;
        width: 100%;
    }

    .apps {
        width: 100%;
        margin-top: 10px;
    }

    .searchResult {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        color: white;
        padding: 10px 0;
        cursor: pointer;
    }

    .current, .searchResult:hover {
        color: #227272;
        font-weight: bold;
    }
</style>