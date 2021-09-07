<script>
    import {apps} from "../../../../../data/store";
    import KeyBind from "./KeyBind.svelte";

</script>

{#each apps as app}
    <KeyBind keys={["ALT", app.key]} text="open {app.name}"/>
{/each}
<KeyBind keys={["ALT", "SHIFT", "c"]} text="close window"/>
<KeyBind keys={["ALT", "SHIFT", "f"]} text="make window fullscreen"/>
<KeyBind keys={["ALT", "RIGHT"]} text="resize window"/>


<style>
    h3 {
        text-align: center;
    }

    * {
        color: white;
    }
</style>