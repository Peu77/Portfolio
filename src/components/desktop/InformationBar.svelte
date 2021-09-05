<script>
    export let height


    let time = ""

    setInterval(() => {
        updateTime()
    }, 1000)

    function updateTime() {
        const date = new Date()
        time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    }

    updateTime()
</script>

<div id="bar" style="height: {height}px">
    <h3 class="text">{time}</h3>
</div>


<style>
    #bar {
        background-color: #4c4c4f;
        color: white;
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .text {
        display: block;
        margin: auto 0;
    }
</style>
