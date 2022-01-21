<template>
    <div id="app">
        <test-map></test-map>
        <operate-panel></operate-panel>
    </div>
</template>

<script>
    import TestMap from "@/components/TestMap";
    import OperatePanel from "@/components/OperatePanel";

    export default {
        name: 'App',
        components: {
            TestMap,
            OperatePanel
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100%;
        height: 100vh;
    }
</style>
