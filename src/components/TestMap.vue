<!--地图-->
<template>
    <div id="test-map"></div>
</template>

<script>
    import MapBase from "@/scripts/map-base";

    export default {
        name: "TestMap",
        data() {
            return {
                gisUrl: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer", //102100坐标系
                // gisUrl: "http://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer", //4326坐标系
            }
        },
        mounted() {
            MapBase.initMap(this.gisUrl);
        }
    }
</script>

<style scoped>
    #test-map {
        height: 100%;
        width: 100%;
    }
</style>