import Vue from 'vue'
import App from './App.vue'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet' ; //引入后就能直接使用L了
import * as Esri from'esri-leaflet' ;
L.esri = Esri; //将esri挂到L上
import 'proj4';
import 'proj4leaflet';
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
