$(document).ready(function(){
    loadBuildNo();
})

function loadBuildNo(){
    $.get('/fyhc/getBulidNo',function(req,res){
        console.log(res);
    })
}