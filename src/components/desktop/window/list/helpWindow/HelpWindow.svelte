<script>
    import {apps} from "../../../../../data/store";
    import KeyBind from "./KeyBind.svelte";

</script>

{#each apps as app}
    <KeyBind keys={["ALT", app.key]} text="open {app.name}"/>
{/each}


<style>
    h3 {
        text-align: center;
    }

    * {
        color: white;
    }
</style>