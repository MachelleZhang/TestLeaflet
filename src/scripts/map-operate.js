/*
 * 使用leaflet进一步的操作
 */

let markers = null; //聚合点数组

export default {
    //添加一个标注
    addRandomMarker() {
        /*
         *  图片路径需要注意，放在public目录下的文件会直接拷贝过去，所以路径是：'../img/icon-location-blue.png'
         *  如果是放在src下的文件，使用时要用require('@/assets/img/icon-location-red.png')获取资源
         */
        let iconRed = L.icon({
            iconUrl: require('@/assets/img/icon-location-red.png'),
            iconSize: [35, 35]
        });

        let coordinate = this.getRandomCoordinate();
        let marker = L.marker(coordinate, {
            icon: iconRed
        });

        marker.bindPopup(`经纬度：${coordinate[0]}, ${coordinate[1]}`).openPopup(); //点击弹出框

        marker.on("click", (event) => { //事件监听
            console.log("标注被点击了", event);
        });
        marker.on("mouseover", () => {
            console.log("鼠标进入标注范围了");
        });

        marker.addTo(map);
        map.setView(coordinate);
    },
    //添加能聚合的点，这个功能使用的是leaflet的插件[leaflet.markercluster]
    addMarkerCluster() {
        let iconBlue = L.icon({
            iconUrl: require('@/assets/img/icon-location-blue.png'),
            iconSize: [35, 35]
        });

        if (markers) {
            map.removeLayer(markers);
        }
        markers = L.markerClusterGroup();
        for (let i=0; i<100; i++) {
            let coordinate = this.getRandomCoordinate();
            let marker = L.marker(coordinate, {
                icon: iconBlue
            });
            markers.addLayer(marker);
        }
        map.addLayer(markers);
        map.setView([35.5, 108.5]);
    },
    //在一定范围内生成随机经纬度，保留6位小数
    getRandomCoordinate() {
        let lat = 35 + Math.floor(Math.random() * 1000000) / 1000000;
        let lng = 108 + Math.floor(Math.random() * 1000000) / 1000000;
        return [lat, lng];
    }
}