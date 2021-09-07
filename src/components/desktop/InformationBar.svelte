<script>
    export let height
    let time = ""

    setInterval(() => {
        updateTime()
    }, 1000)

    function updateTime() {
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        function formatTime(time) {
            let string = time
            if (time < 10)
                string = "0" + string

            return string
        }

        time = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds)
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
