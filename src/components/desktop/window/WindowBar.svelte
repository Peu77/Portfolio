<script>
    export let height
    export let title
</script>

<div id="windowBar" style="height: {height}px">
    <p id="title">{title}</p>
</div>

<style>
    #windowBar{
        width: 100%;
        background-color: #227272;
        cursor: pointer;
        transition: filter 0.2s linear;
    }

    #windowBar:hover{
        filter: brightness(80%);
    }

    #title{
        font-weight: bold;
        display: block;
        text-align: center;
        color: white;
        line-height: 30px;
    }
</style>