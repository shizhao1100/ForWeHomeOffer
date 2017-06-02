function controlsBox() {
    this.type = 0;
    var controls = document.getElementsByClassName("_button");
    $("#arrowType").click(function () {
        type = 0;
        map.mouseType = type;
        changecolor(0);
        document.getElementById("map").style.cursor = "";
    })
    $("#handType").click(function () {
        type = 1;
        map.mouseType = type;
        changecolor(1);
        document.getElementById("map").style.cursor = "pointer";
    })
    $("#rectType").click(function () {
        type = 2;
        map.mouseType = type;
        changecolor(2);
        document.getElementById("map").style.cursor = "crosshair";
    })
    $("#eraserType").click(function () {
        type = 3;
        map.mouseType = type;
        changecolor(3);
        document.getElementById("map").style.cursor = "crosshair";
    })
    function changecolor(k) {
        for (var i = 0; i < 4; i++) {
            if (i == k) {
                controls[i].style.background = "#cccccc";
            } else {
                controls[i].style.background = "#ffffff";
            }
        }
    }
}
controlsBox();