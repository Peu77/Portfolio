<script>
    import {apps} from "../../../../../data/store";
    import KeyBind from "./KeyBind.svelte";

    export let window
</script>

<div class="helpWindow">
    {#each apps as app}
        <KeyBind keys={["ALT", app.key]} text="open {app.name}"/>
    {/each}
    <KeyBind keys={["ALT", "SHIFT", "c"]} text="close window"/>
    <KeyBind keys={["ALT", "SHIFT", "f"]} text="toggle window fullscreen"/>
    <KeyBind keys={["ALT", "SHIFT", "j"]} text="set to left corner"/>
    <KeyBind keys={["ALT", "SHIFT", "k"]} text="set to right corner"/>
    <KeyBind keys={["ALT", "RIGHT"]} text="resize window"/>
    <KeyBind keys={["SHIFT", "SHIFT"]} text="open search-bar"/>
</div>

<style>

    .helpWindow{
        padding: 10px;
    }

    h3 {
        text-align: center;
    }

    * {
        color: white;
    }
</style>