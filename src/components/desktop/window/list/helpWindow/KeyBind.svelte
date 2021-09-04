<script>
    export let keys
    export let text
</script>

<div class="container">
    <p class="key">{keys.join(" + ")}</p>
    <p>{text}</p>
</div>

<style>
    .container{
        display: flex;
        color: white
    }
    .key {
        margin-right: 10px;
        font-weight: bold;
        color: #4ee1a3;
    }
</style>