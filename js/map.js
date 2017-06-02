function Map() {
    var that = this;

    // 鼠标指针常量
    const MOUSETYPE_ARROW = 0;
    const MOUSETYPE_HAND = 1;
    const MOUSETYPE_RECT = 2;
    const MOUSETYPE_ERASER = 3;


    //初始化地图
    this.map = new L.Map('map', { center: new L.LatLng(34.2777998978, 108.953098279), zoom: 3 })

    // osmConfig
    var osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3pwIiwiYSI6ImNqM2VodXhtNDAwYnQycW54NGx0ajNzMHoifQ.ZCO7mXuAOvYilsPIbW2MhA',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, { minZoom: 3, attribution: osmAttrib });

    this.map.addLayer(osm);

    // 指针状态
    this.mouseType = MOUSETYPE_ARROW;

    // 标记物列表
    this.markerArray = [];

    var mousedown;

    var MouseDownPoint;
    var MouseDownPixel;

    var MouseUpPoint;
    var MouseUpPixel;

    // 临时图形
    var _graph;

    var routes = [];



    //创建标记物
    var markers = new L.FeatureGroup();
    //标记物配置
    var Icon = L.Icon.extend({
        options: {
            iconSize: [38, 45],
            iconAnchor: [18, 45],
        }
    });

    //根据地理名称修改图标
    var geticon = function (num) {

        if (0 <= num && num <= 50) {
            return new Icon({ iconUrl: 'img/png/marker1.png' });
        } else if (51 <= num && num <= 100) {
            return new Icon({ iconUrl: 'img/png/marker2.png' });
        }
        else if (101 <= num && num <= 150) {
            return new Icon({ iconUrl: 'img/png/marker3.png' });
        }
        else if (151 <= num && num <= 200) {
            return new Icon({ iconUrl: 'img/png/marker4.png' });
        }
        else if (201 <= num && num <= 300) {
            return new Icon({ iconUrl: 'img/png/marker5.png' });
        }
        else if (300 <= num) {
            return new Icon({ iconUrl: 'img/png/marker6.png' });
        } else {
            return L.Icon.Default();
        }

    }

    function addMarker(point, data) {
        if (data.data.aqi != '-') {
            var marker = L.marker(point, { icon: geticon(data.data.aqi) }).bindPopup(NewPopupDiv(data.data)).addTo(that.map);
        }
        that.markerArray.push(marker);
        return marker;
    }
    //添加从经纬度添加Marker
    function addMarkerWithLatLng() {
        var _geo = that.MouseDownPoint.lat + ';' + that.MouseDownPoint.lng;
        connector.getAQIbyGeo(_geo, function (data) {
            if (data.status == 'ok') {
                addMarker(that.MouseDownPoint, data).openPopup();
            }
        });
    }
    //从坐标范围添加Marker
    function addMarkerWithArea() {
        var _latmix;
        var _latmax;
        var _lngmix;
        var _lngmax;
        if (that.MouseDownPoint.lat > that.MouseUpPoint.lat) {
            _latmix = that.MouseUpPoint.lat;
            _latmax = that.MouseDownPoint.lat;
        } else {
            _latmax = that.MouseUpPoint.lat;
            _latmix = that.MouseDownPoint.lat;
        }
        if (that.MouseDownPoint.lng > that.MouseUpPoint.lng) {
            _lngmix = that.MouseUpPoint.lng;
            _lngmax = that.MouseDownPoint.lng;
        } else {
            _lngmax = that.MouseUpPoint.lng;
            _lngmix = that.MouseDownPoint.lng;
        }
        var _bounds = _latmix.toFixed(5) + ',' + _lngmix.toFixed(5) + ',' + _latmax.toFixed(5) + ',' + _lngmax.toFixed(5);
        console.log(_bounds);
        connector.getAQIbyBounds(_bounds, function (data) {
            for (var i = 0; i < data.data.length; i++) {
                console.log(data.data[i]);
                var ponit = [data.data[i].lat, data.data[i].lon];
                console.log(ponit);
                if (_latmix <= ponit[0] && ponit[0] <= _latmax &&
                    _lngmix <= ponit[1] && ponit[1] <= _lngmax) {
                    console.log("11");
                    var _data = {}
                    _data.data = data.data[i];
                    addMarker(ponit, _data);
                }

            }
        });
    }
    //创建标记物弹出框
    var NewPopupDiv = function (data) {
        var div = document.createElement('div');
        div.className = "PopupDiv";
        var staionname = document.createElement('h4');
        if (data.city) {
            staionname.innerHTML = data.city.name;
        }
        if (data.attributions) {
            var EPAname = document.createElement('h5');
            EPAname.innerHTML = data.attributions[0].name;
        }
        var ul = document.createElement('ul');
        ul.className = "PopupDivul";

        var li = document.createElement('li');
        li.className = "PopupDivli";
        li.innerHTML = "空气质量： " + data.aqi;
        ul.appendChild(li);
        if (staionname) {
            div.appendChild(staionname);
        }
        if (EPAname) {
            div.appendChild(EPAname);
        }
        if (ul) {
            div.appendChild(ul);
        }
        return div;
    }
    //鼠标压下事件
    function onMouseDown(e) {
        that.mousedown = true;
        that.MouseDownPoint = e.latlng;
        that.MouseDownPixel = e.containerPoint
        if (parseInt(that.mouseType)) {
            that.map.dragging.disable();
        }
    }

    //鼠标按键抬起事件
    function onMouseUp(e) {
        that.mousedown = false;
        that.MouseUpPoint = e.latlng;
        that.MouseUpPixel = e.containerPoint;
        that.map.dragging.enable();
        mouseUp(that.mouseType);
    }
    //鼠标移动事件
    function onMouseMove(e) {
        if (that.mousedown) {
            mouseMove(that.mouseType, e);
        }
    }
    // markerArray
    function mouseUp(mouseType) {
        switch (parseInt(mouseType)) {
            case MOUSETYPE_ARROW: {
                break;
            }
            case MOUSETYPE_HAND: {
                addMarkerWithLatLng();
                break;
            }
            case MOUSETYPE_RECT: {
                addMarkerWithArea();
                break;
            }
            case MOUSETYPE_ERASER: {
                if (that.markerArray) {
                    for (var i = 0; i < that.markerArray.length; i++) {
                        if(!that.markerArray[i]){
                            that.markerArray.splice(i, 1);
                            i--;
                        }
                        else if (CalculationDistance.Distance(that.markerArray[i]._latlng.lat, that.markerArray[i]._latlng.lng, that.MouseDownPoint.lat, that.MouseDownPoint.lng) < _graph._mRadius) {
                            that.markerArray[i].remove();
                            that.markerArray.splice(i, 1);
                            i--;
                        }
                    }
                }
                if (_graph) {
                    _graph.remove();
                    _graph = null;
                }
                break;
            }
        }
    }
    function mouseMove(mouseType, e) {
        switch (parseInt(mouseType)) {
            case MOUSETYPE_ARROW: {
                break;
            }
            case MOUSETYPE_HAND: {
                break;
            }
            case MOUSETYPE_RECT: {
                if (_graph) {
                    _graph.remove();
                    _graph = null;
                }
                var latlngs = [[that.MouseDownPoint.lat, that.MouseDownPoint.lng], [e.latlng.lat, that.MouseDownPoint.lng], [e.latlng.lat, e.latlng.lng], [that.MouseDownPoint.lat, e.latlng.lng]];
                _graph = L.polygon(latlngs, { stroke: true, color: "#cccccc", fillColor: "#cccccc", fillOpacity: 0.3 }).addTo(that.map);
                _graph.type = MOUSETYPE_RECT;
                break;
            }
            case MOUSETYPE_ERASER: {
                if (_graph) {
                    _graph.remove();
                    _graph = null;
                }
                var distance = CalculationDistance.Distance(that.MouseDownPoint.lat, that.MouseDownPoint.lng, e.latlng.lat, e.latlng.lng);
                _graph = L.circle(that.MouseDownPoint, { radius: distance, stroke: true, color: "#cccccc", fillColor: "#cccccc", fillOpacity: 0 }).addTo(that.map);
                _graph.type = MOUSETYPE_ERASER;
                break;
            }
            case 4: {

            }
            default: {
                break;
            }
        }
    }
    //层级改变时  
    this.map.on('mousedown', onMouseDown);
    this.map.on('mouseup', onMouseUp);
    this.map.on('mousemove', onMouseMove);
}
// var map = new map1();  