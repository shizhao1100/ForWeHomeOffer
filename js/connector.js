function Connector() {
    this.getAQIbyGeo = function (geo, f) {
        $.ajax({
            type: "get",
            url: "https://api.waqi.info/feed/geo:" + geo + "/?token=f5f4a3f2276cdbfcbb1ddf05e59c40bfe4a61ccf",
            dataType: "json",
            success: function (data) {
                f(data);
            },
            Error: function () {
                console.log("获取数据失败");
            }
        });
    }
    this.getAQIbyBounds = function (bounds, f) {
        $.ajax({
            type: "get",
            url: "https://api.waqi.info/map/bounds/?latlng="+bounds+"&token=f5f4a3f2276cdbfcbb1ddf05e59c40bfe4a61ccf",
            dataType: "json",
            success: function (data) {
                f(data);
            },
            Error: function () {
                console.log("获取数据失败");
            }
        });
    }
}