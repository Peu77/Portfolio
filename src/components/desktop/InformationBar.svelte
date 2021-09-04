<script>
    export let height

    const date = new Date()
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
</script>

<div id="bar">
    <h3>{time}</h3>
</div>


<style>
    #bar {
        background-color: #4c4c4f;
        color: white;
        padding: 5px;
        text-align: center;
    }
</style>