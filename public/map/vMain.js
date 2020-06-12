Vue.component("roadli", {
    props: ["road"],
    template: '<li>{{road.name}}</li>'
});

Vue.component("crossli", {
    props: ["cross"],
    template: '<li>{{cross.name}}</li>'
});

Vue.component("C2Cli",{
    props:["C2C"],
    template:'<li>{{C2C.name}}</li>'
});

Vue.component("addroad", {
    template: '\
    <div class="addSpan" >\
    <p class="title">添加路名</p>\
    <p>添加起点</p>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <p>添加终点</p>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <p>请输入该路的备案编码ID</p>\
    <input type="text"  style="width:98%;"></input>\
    <p>请依次从起点选择道路途径点,如无需要,可以不选</p>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <input type="text" class="lnglat" readonly="true" style="width:98%;" onclick="lnglat_click(event)"></input>\
    <button class="exit"  @click.emit="vexit">退出</button>\
    <button class="comfirm">确定</button>\
    </div>\
    ',
    methods:{
        vexit:function(){
            this.$emit('closeaddspan');
        }
    }
});
Vue.component("addcross",{
    template: '\
    <div class="addSpan" >\
    <h6>添加路名</h6>\
    <p>选择东西走向路</p>\
    <input></input></br>\
    <p>选择南北走向路</p>\
    <input type="text"></input>\
    <p>请输入该路口的编码ID</p>\
    <input></input>\
    <p>请选择该路口的经纬度</p>\
    <input></input>\
    <button class="exit"  @click.emit="vexit">退出</button>\
    <button class="comfirm">确定</button>\
    </div>'
});
Vue.component("addc2c",{
    template: '\
    <div class="addSpan" >\
    <h6>添加路段</h6>\
    <p>选择起点路口</p>\
    <input></input></br>\
    <p>选择终点路口</p>\
    <input type="text"></input>\
    <p>请输入该路段的编码ID</p>\
    <input></input>\
    <button class="exit"  @click.emit="vexit">退出</button>\
    <button class="comfirm">确定</button>\
    </div>\
    '
});

var app = new Vue({
    el: "#level",
    data: {
        roadlist: [{
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
        }],
        crossList: [{
            name: "九峰一路与孟新路",
            position: [114.48597, 30.492405]
        }, {
            name: "九峰一路与花山大道",
            position: [114.502925, 30.492791]
        }],
        C2CList: [],
        vForms:[],
        isShow:{
            "road":false,
            "cross":false,
            "C2C":false
        }
    },
    methods: {
        vSelectRoad: function (event) {
            removeMarker();
            let roadSpan;
            roadList.forEach(function (oneRoad) {
                if (event.target.innerText == oneRoad.name) {
                    roadSpan = oneRoad;
                }
            })
            let startPoint, endPoint;
            let wayPoints = [];
            startPoint = new AMap.LngLat(roadSpan.startAndEnd[0][0], roadSpan.startAndEnd[0][1]);
            endPoint = new AMap.LngLat(roadSpan.startAndEnd[1][0], roadSpan.startAndEnd[1][1]);
            if (roadSpan.passPoint) {
                roadSpan.passPoint.forEach(function (point) {
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
        },
        vSelectCross: function (event) {
            removeMarker();
            removeDriving();
            removeDistance();
            let crossSpan;
            crossList.forEach(function (onecross) {
                if (onecross.name == event.target.innerText) crossSpan = onecross;
            })
            var marker = new AMap.Marker({
                position: new AMap.LngLat(crossSpan.position[0], crossSpan.position[1]),
                // 将 html 传给 content
                // content: "路口",
                // 以 icon 的 [center bottom] 为原点
                offset: new AMap.Pixel(-13, -30)
            });
            marker.setTitle(crossSpan.name);
            map.add(marker);
            markers.push(marker);
            map.setZoomAndCenter(15, [crossSpan.position[0], crossSpan.position[1]]);
            inglatlput.innerHTML = "经纬度: " + crossSpan.position[0] + ',' + crossSpan.position[1];
        },
        showAddSpan: function (e) {
            app.isShow[(e.target.className.split(' ')[1])] = true;
        },
        closeAddSpan:function(){
            console.log(123);
            app.isShow['road']=false;
            app.isShow['cross']=false;
            app.isShow['C2C']=false;
        }
    }
});