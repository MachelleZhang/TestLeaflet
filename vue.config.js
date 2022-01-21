const path = require("path");
module.exports = {
    configureWebpack: {
      devtool: "source-map"
    },
    devServer: {
        // 热重载
        hot: true,
        // 错误显示在页面中
        overlay: true,
        // 信息打印
        stats: "errors-warnings",
        // 自动打开
        open: false,
        // 代理
        proxy: {
            // https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer
            '/arcgis/rest/services': {
                target: 'https://map.geoq.cn',
                ws: false, // 需要websocket 开启
            },
        }
    },
}