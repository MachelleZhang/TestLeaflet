/*
 * 初始化地图的最基本使用方法
 * leaflet api指导网站：https://leafletjs.com/reference.html
 */

let metaData = null; //服务返回的数据
let gisUrl = null; //服务地址
let centerX = 0; //初始展现中心点
let centerY = 0;
let maxZoom = 17; //缩放级别
let minZoom = 0;

export default {
    //请求地图服务数据
    initMap(url) {
        gisUrl = url;
        L.esri.get(gisUrl, {}, (error, response) => {
            if (response) {
                console.log(response);
                metaData = response;
                this.renderMap();
            } else {
                console.log(error);
            }
        });
    },
    //渲染地图
    renderMap() {
        let mapContainer = document.getElementById("test-map");

        let crs = this.configCRS();
        // 1.创建地图
        let map = window.map = L.map(mapContainer, {
            continuousWorld: true,
            zoomControl: false,
            crs
        });
        map.setView([centerY, centerX], maxZoom - 8); //y对应纬度，x对应经度

        // 2.添加图层
        let mapLayer = new L.esri.tiledMapLayer({
            url: gisUrl,
            minZoom: minZoom,
            maxZoom: maxZoom,
            crs: L.CRS.EPSG4326
        });
        map.addLayer(mapLayer);

        // 3.可选：自定义控件
        map.zoomControl = L.control.zoom({
            position: 'bottomleft',
            zoomInTitle: '缩小',
            zoomOutTitle: '放大',
        });
        map.zoomControl.addTo(map);
    },
    /*
     * 配置CRS
     * 坐标系不同，获取的瓦片图会有偏差
     * 坐标系转换，入参基本都是固定值，常见的有4326，3857，102100的坐标系
     * esri-leaflet默认支持3857的坐标系，如果使用4326坐标系，则需要使用Proj做转换
     * 不需要转换坐标系时，可以不用配置CRS
     */
    configCRS() {
        let wkid = metaData.spatialReference.wkid; //服务的坐标系
        let crs = null;
        if (wkid === 4326) {
            crs = new L.Proj.CRS(
                'EPSG:4326',
                "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees", {
                    resolutions: this.getResolutions(),
                    origin: this.getOrigin()
                }
            );
        } else if (wkid === 102100) {
            crs = new L.Proj.CRS(
                'EPSG:3857',
                '+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6356752.3142451793 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs', {
                    resolutions: this.getResolutions(),
                    origin: this.getOrigin()
                }
            );
        } else { //默认使用3857坐标系
            crs = new L.Proj.CRS(
                'EPSG:3857',
                '+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs', {
                    resolutions: this.getResolutions(),
                    origin: this.getOrigin()
                }
            );
        }
        return crs;
    },
    //获取分辨率数组
    getResolutions() {
        let lods = metaData.tileInfo.lods;
        if (lods && lods.length > 0) {
            minZoom = lods[0].level; //获取缩放等级
            maxZoom = lods[lods.length - 1].level;
            let resolutions = lods.map(lod => lod.resolution);
            return resolutions;
        }
        return [];
    },
    //获取原点信息
    getOrigin() {
        let originX = metaData.tileInfo.origin.x; //原点信息
        let originY = metaData.tileInfo.origin.y;
        //根据服务返回信息计算初始中心点，但计算可能会有误，建议固定
        // centerX = (metaData.initialExtent.xmax + metaData.initialExtent.xmin)/2; //获取初始中心点信息
        // centerY = (metaData.initialExtent.ymax + metaData.initialExtent.ymin)/2;
        centerX = 108;
        centerY = 32;
        return [originX, originY];
    }
}