var roadList = [{
    startAndEnd: [
        [114.47983503, 30.49023975],
        [114.54173505, 30.50620491]
    ],
    passPoint: [
        [114.53092575, 30.5008804]
    ],
    direct: 1,
    id: '42060000000001001',
    name: '九峰一路'
}, {
    startAndEnd: [
        [114.47860658, 30.50556709],
        [114.48593974, 30.49249555]
    ],
    passPoint: [],
    direct: 2,
    id: '42060000000001002',
    name: '孟新路'
}, {
    startAndEnd: [
        [114.50291812, 30.49003173],
        [114.570086, 30.5600622]
    ],
    passPoint: [
        [114.54726577, 30.57501828]
    ],
    direct: 2,
    id: '42060000000001002',
    name: '花山大道'
}]
var crossList = [{
    name: "九峰一路与孟新路",
    position: [114.48597, 30.492405]
}, {
    name: "九峰一路与花山大道",
    position: [114.502925, 30.492791]
}]



var map = new AMap.Map('container', {
    resizeEnable: true, //是否监控地图容器尺寸变化
    zoom: 11, //初始化地图层级
    center: [114.285564, 30.543027], //初始化地图中心点
    mapStyle: 'amap://styles/394e35f56d01465d3f793b8fcaeed0e9'
});
var driving = new AMap.Driving({
    map: map,
    panel: "panel",
    policy: AMap.DrivingPolicy.LEAST_DISTANCE
});
var selectRoad = function (roadName) {
    removeMarker();
    let road;
    roadList.forEach(function (oneRoad) {
        if (roadName == oneRoad.name) {
            road = oneRoad;
        }
    })
    let startPoint, endPoint;
    let wayPoints = [];
    startPoint = new AMap.LngLat(road.startAndEnd[0][0], road.startAndEnd[0][1]);
    endPoint = new AMap.LngLat(road.startAndEnd[1][0], road.startAndEnd[1][1]);
    if (road.passPoint) {
        road.passPoint.forEach(function (point) {
            wayPoints.push(new AMap.LngLat(point[0], point[1]));
        })
    }
    driving.search(startPoint, endPoint, {
        waypoints: wayPoints
    }, function (status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        log.success("正在查询请稍后");
        if (status === 'complete') {
            log.success('路线查询完成');
            getDistance(/\(.*\)/.exec(driving.M._currentRouteTitle.outerText)[0]);
        } else {
            log.error('路线查询失败：' + result)
        }
    });
}

map.on('click', function (e) {
    AMap.plugin("AMap.Geocoder", function () {
        inglatlput.innerHTML = "经纬度: " + e.lnglat.toString();
        if(addNew ){
            lnglat_clicked(e.lnglat.toString());
        }
    })
});
var $ = function (elementid) {
    return document.getElementById(elementid);
}
var inglatlput = $("sStatus");

var markers = [];

function selectPoint(name) {
    removeMarker();
    removeDriving();
    removeDistance();
    let position;
    crossList.forEach(function (cross) {
        if (cross.name == name) position = cross;
    })
    var marker = new AMap.Marker({
        position: new AMap.LngLat(position.position[0], position.position[1]),
        // 将 html 传给 content
        // content: "路口",
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-13, -30)
    });
    marker.setTitle(position.name);
    map.add(marker);
    markers.push(marker);
    map.setCenter([position.position[0], position.position[1]]);
    inglatlput.innerHTML = "经纬度: " + position.position[0] + ',' + position.position[1];
}

function removeMarker() {
    markers.forEach(function (marker) {
        map.remove(marker);
    })
}

function removeDriving() {
    driving.clear();
}

function removeDistance() {
    let dom_distance = document.getElementById('dDistance');
    dom_distance.innerText = '';
}

function getDistance(text) {
    let dom_distance = document.getElementById('dDistance');
    dom_distance.innerText = '道路长度:' + text;
}

function addWhat(event){
    
}

let addNew = false;
function lnglat_click(e){
    e.target.placeholder="请在地图上点选目标";
    e.target.disabled="disabled";
    addNew = true;
}

function lnglat_clicked(llString){
    let inputLLList = document.getElementsByClassName("lnglat");
    Array.from(inputLLList).forEach(function(dInput){
        if(dInput.disabled == true){
            dInput.value = llString;
            dInput.disabled = false;
        }
        addNew = false;
    })
}

function addSpanConfirm(e){

}

function addSpanExit(e){

}
