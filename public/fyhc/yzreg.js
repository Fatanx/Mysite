let currentBn = "0";
let currentGn = "0";
let selectBuildDom = $("#SbuildNo");
let selectGroupDom = $("#SgroupNo");
let selectRoomDom = $("#SroomNo");
let inputName = $("#yzName");
let inputTel = $("#yzTel");
let selectSelf = $("#SisSelf");

$(document).ready(function () {
    loadBuildNo();
    document.getElementById("SbuildNo").innerHTML = "<option value='0'>--请选择--</option>";
    currentBn = document.getElementById("SbuildNo").value;
})
selectBuildDom.change(function (e) {
    if (e.target.value != "0") {
        document.getElementById("SgroupNo").innerHTML = "<option value='0'>--请选择--</option>";
        loadGroupNo(e.target.value);
        currentBn = e.target.value;

    }
})

selectGroupDom.change(function (e) {
    if (e.target.value != "0") {
        document.getElementById("SroomNo").innerHTML = "";
        loadRoomNo(e.target.value);
        currentGn = e.target.value;
    }
})

$("#buttonConfirm").click(function () {
    if (selectBuildDom[0].value != "0" && selectGroupDom[0].value != "0" && selectRoomDom[0].value != "0" && /[\u4e00-\u9fa5]/.test(inputName[0].value) && /^1[0-9]{10}/.test(inputTel[0].value)) {
        console.log("success");
        toDatabase();
    } else if (!/[\u4e00-\u9fa5]/.test(inputName[0].value)) {
        window.alert("名称请使用中文!")
    }else if(! /^1[0-9]{10}/.test(inputTel[0].value)){
        window.alert("错误的电话号码!")
    }
})

function loadBuildNo() {
    $.post('/fyhc/getBulidNo', function (res) {
        res.forEach(element => {
            let tpDom = document.createElement("option");
            tpDom.value = element;
            tpDom.innerHTML = element;
            document.getElementById("SbuildNo").appendChild(tpDom);
        });
    });
};

function loadGroupNo(bNo) {
    $.post('/fyhc/getGroupNo', {
        No: bNo,
    }, function (res) {
        res.forEach(element => {
            let tpDom = document.createElement("option");
            tpDom.value = element;
            tpDom.innerHTML = element;
            document.getElementById("SgroupNo").appendChild(tpDom);
        });
    });
};

function loadRoomNo(gNo) {
    $.post('/fyhc/getRoomNo', {
        bNo: currentBn,
        No: gNo
    }, function (res) {
        res.forEach(element => {
            let tpDom = document.createElement("option");
            tpDom.value = element.key;
            tpDom.innerHTML = element.value;
            document.getElementById("SroomNo").appendChild(tpDom);
        });
    });
}

function toDatabase() {
    console.log(selectRoomDom[0].value);
    $.post('/fyhc/toDatabase', {
        roomId: document.getElementById("SroomNo").value,
        name: inputName[0].value,
        tel: inputTel[0].value,
        self: selectSelf[0].value
    }, res => {
        selectBuildDom[0].value = "0"
        selectGroupDom[0].value = "0"
        selectRoomDom[0].value = "0"
        inputName[0].value = "";
        inputTel[0].value = "";
        selectSelf[0].value = "0"
        window.alert(res);
    })
}


/////////////////////////////////翻页功能//////////////////////////
$("#buttonNext").click(function () {
    if (selectBuildDom[0].value != "0" && selectGroupDom[0].value != "0" && selectRoomDom[0].value != "0") {
        $(".stepTwo").css("display", "inline-block");
        $(".stepOne").css("display", "none");
    }
})

$("#buttonBack").click(function () {
    if (selectBuildDom[0].value != "0" && selectGroupDom[0].value != "0" && selectRoomDom[0].value != "0") {
        $(".stepOne").css("display", "inline-block");
        $(".stepTwo").css("display", "none");
    }
})
/////////////////////////////////翻页功能//////////////////////////