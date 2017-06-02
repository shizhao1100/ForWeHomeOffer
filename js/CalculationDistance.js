function CalculationDistance() {

}
//计算两个GPS的距离
CalculationDistance.Distance = function (lat1, lon1, lat2, lon2) {
    var _distance = 0;

    var pk = 180 / Math.PI;

    var a1 = lat1 / pk;
    var a2 = lon1 / pk;
    var b1 = lat2 / pk;
    var b2 = lon2 / pk;

    var t1 = Math.cos(a1) * Math.cos(a2) * Math.cos(b1) * Math.cos(b2);
    var t2 = Math.cos(a1) * Math.sin(a2) * Math.cos(b1) * Math.sin(b2);
    var t3 = Math.sin(a1) * Math.sin(b1);
    var tt = Math.acos(t1 + t2 + t3);

    _distance = 6366000 * tt;

    return _distance;
}
//根据GPS和范围（单位m）求GPS范围
CalculationDistance.getAround = function (lat, lon, raidus) {
    var degree = (24901 * 1609) / 360.0;

    var raidusMile = raidus;

    var dpmLat = 1 / degree;

    var radiusLat = dpmLat * raidusMile;

    var minLat = lat - radiusLat;

    var maxLat = lat + radiusLat;

    var mpdLng = degree * Math.cos(lat * (Math.PI / 180));

    var dpmLng = 1 / mpdLng;

    var radiusLng = dpmLng * raidusMile;

    var minLng = lon - radiusLng;

    var maxLng = lon + radiusLng;

    return [minLat, minLng, maxLat, maxLng];
}
CalculationDistance.GetColor = function (val, min, max) {
    if (val > max) {
        val = max;
    }
    val = max - val;
    var one = (255 + 255) / 40;
    var r = 0, g = 0, b = 0;
    if (val < (max - min) / 3) {
        r = parseInt(one * val);
        g = 255;
    }
    else if (val >= (max - min) / 3 && val < max) {
        r = 255;
        g = 255 - parseInt((val - 20) * one);
    }
    else { r = 255; }
    return d3.rgb(r, g, b).toString();
}