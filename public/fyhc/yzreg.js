let currentBn = "0";
let currentGn = "0";

$(document).ready(function(){
    loadBuildNo();
    currentBn=document.getElementById("SbuildNo").value;
})
$("#SbuildNo").change(function(e){
    loadGroupNo(e.target.value);
    currentBn = e.target.value;
})
$("#SgroupNo").change(function(e){
    loadRoomNo(e.target.value);
    currentGn = e.target.value;
})

function loadBuildNo(){
    $.post('/fyhc/getBulidNo',function(res){
        res.forEach(element => {
            let tpDom = document.createElement("option");
            tpDom.value = element;
            tpDom.innerHTML = element;
            document.getElementById("SbuildNo").appendChild(tpDom);
        });
    });
};

function loadGroupNo(bNo){
    $.post('/fyhc/getGroupNo',{No:bNo,},function(res){
        res.forEach(element => {
            let tpDom = document.createElement("option");
            tpDom.value = element;
            tpDom.innerHTML = element;
            document.getElementById("SgroupNo").appendChild(tpDom);
        });
    });
};

function loadRoomNo(gNo){
    $.post('/fyhc/getRoomNo',{bNo:currentBn,No:gNo},function(res){
        res.forEach(element => {
            let tpDom = document.createElement("option");
            tpDom.value = element;
            tpDom.innerHTML = element;
            document.getElementById("SroomNo").appendChild(tpDom);
        });
    });
}