const express = require('express');
const router = express.Router();
const fs=require('fs');
const  multer = require("multer");
const upload = multer({
    dest:".\/public\/images\/shareinfo\/"
})
const singleUp = upload.single("file");

//namelist{name:[name,tel,area,build,group,number,limit]}
var namelist={};
//tellist{tel:name}
var tellist={};
var addresslist={};
var access = '<body style="background-color: green;"><div style="font-size:25px;width:600px;min-height:400px;position:absolute;left:50%;top:50%;margin-left:-300px;margin-top:-200px;text-align:center;background-color: rgba(0, 204,51, 0.4);">    <p style="font-size:50px;line-height:50px;color: white;">用户已记录，请放行</p></div></body>';
var please = '<body style="background-color: orange;"><div style="font-size:25px;width:600px;min-height:400px;position:absolute;left:50%;top:50%;margin-left:-300px;margin-top:-200px;text-align:center;background-color: rgba(250, 204, 51, 0.4);">    <p style="font-size:50px;line-height:50px;color: white;">请门岗登录或这侧记录员身份</p></div></body>';
var noaccess = '<body style="background-color: red;"><div style="font-size:25px;width:600px;min-height:400px;position:absolute;left:50%;top:50%;margin-left:-300px;margin-top:-200px;text-align:center;background-color: rgb(255, 255, 51,0.4);">    <p style="font-size:50px;line-height:50px;color: white;">对不起，根据政府要求，您不被允许出门，请确认是否登录或者出入次数过多</p></div></body>';

router.post("/RegorLog",function(req,res){
    let name = req.body.name;
    let tel = req.body.tel; 
    if(namelist[name]==undefined){
        res.send({msg:"next",result:false});
    }
    else if(namelist[name][1] == tel){ 
        var time = new Date().getTime();
        let text = time.toString() + tel.toString() ;
        req.session.name = name;
        req.session.admin = false;
        
        
        let arrAdd = idToText(namelist[name][2],namelist[name][3],namelist[name][4]);
        let info = name + "," + namelist[name][1] + "," + arrAdd[0] + "+" + arrAdd[1] + "+" + arrAdd[2] + "+" + namelist[name][5];
        res.send({msg:"登录成功",result:true,text:text,info:info});
    }
 
    else{
        res.send({msg:"错误的用户名或者手机号"});
    }
})

//扫描并记录
router.get("/record/:id",function(req,res){
    if(req.session.admin != false && req.session.name != undefined && tellist[req.params.id.substring(13,req.params.id.length)]){
        try {
            let tel = req.params.id.substring(13,req.params.id.length);
            let dtime =  new Date()
            let admin = req.session.name;
            let name = tellist[tel];
            dtime = timeReplace(dtime);
            console.log(dtime +  name + " 在 " + admin + " 扫描\n");
            addRecordNum(name);//记录数字
            if(judgeAccess(name)){
                //记录成功扫描数据并发送成功通知
                writeRecord(dtime + " " + name + " 在 " + admin + " 扫描,放行\r\n");
                res.send(access);
            }
            else{
                writeRecord(dtime + " " + name + " 在 " + admin + " 扫描,拒绝\r\n");
                res.send(noaccess);
            }
        } catch (error) {
            writeRecord("未知错误扫描,拒绝");
            res.send(noaccess);
        }
        
    }
    else if(req.session.admin == false){
        res.send(please)
    }
    else{
        res.send("未知错误，请联系微信号onlytanx");
    }
})

//用户注册
router.post("/reg",function(req,res){
    name = req.body.name;
    tel = req.body.tel;
    area = req.body.area;
    build = req.body.build;
    group = req.body.group;
    number = req.body.number;
    namelist[name]=[name,tel,area,build,group,number];

    tellist[tel] = name;
    var time = new Date().getTime();
    let text = time.toString() + tel.toString() ;
    req.session.name = name;
    req.session.admin = false;

    let strNameList = JSON.stringify(namelist) ;
    let strTelList = JSON.stringify(tellist);
    writeUserList(strNameList);
    writeTelList(strTelList);

    let arrAdd = idToText(namelist[name][2],namelist[name][3],namelist[name][4]);
    let info = name + "," + namelist[name][1] + "," + arrAdd[0] + "+" + arrAdd[1] + "+" + arrAdd[2] + "+" + namelist[name][5] + "," +namelist[name][6] + "," + namelist[name][7];
    res.send({msg:"登录成功",result:true,text:text,info:info});
})

router.post("/checkname",function(req,res){
    let sessionName = req.session.name;
    if(sessionName){
        let tel = namelist[sessionName][1];
        var time = new Date().getTime();
        let text = time.toString() + tel.toString();
        let arrAdd = idToText(namelist[sessionName][2],namelist[sessionName][3],namelist[sessionName][4]);
        let info = sessionName + "," + namelist[sessionName][1] + "," + arrAdd[0] + "+" + arrAdd[1] + "+" + arrAdd[2] + "+" + namelist[sessionName][5];
        res.send({msg:"登录成功",result:true,text:text,info:info});
    }
    else{
        res.send({result:false});
    }
})

//管理员登录
router.get("/getadmin/:id",function(req,res){
    if(req.params.id && req.session.name){
        req.session.admin = "admin" ;
        res.send("管理员身份登录成功，请退回微信使用扫一扫功能");
    }
    else if(req.session.name == undefined){
        res.send("请先登录您的个人账号");
    }
})


//时间格式化
function timeReplace(time){
    var month=time.getMonth(); 
    var day=time.getDate(); 
    var hour=time.getHours(); 
    var minute=time.getMinutes(); 
    var second=time.getSeconds();
    let result = month +"月" +day +"日 " +hour +":"+ minute+ ":" +second ;
    return result;
}
//日扫描三次判断
//设定每日扫描4次
var everyDay = 4;
function judgeAccess(name){
    let num = Number(namelist[name][6]);
    if( num <= everyDay){
        return true;
    }
    else   return false;
}

//给namelist添加次数验证 初次扫描即增加为1
function addRecordNum(name){
    let MD = getMD();
    if(namelist[name][6] == undefined){
        namelist[name].push('1');
        namelist[name].push(MD);
    }
    else{
        let num =  Number(namelist[name][6]);
        if(num <= everyDay && namelist[name][7] == MD){
            num += 1;
            namelist[name][6] = num.toString() ;
        }
        else if(namelist[name][7] != MD){
            namelist[name][6] = '1';
            namelist[name][7] = MD;
        }
    }
    
}

//获取当前日期month，day
function getMD(){
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDay();
    return month.toString() + day.toString() ;
}

//读取注册用户数据
function readUserList(){
    fs.readFile('./public/data/user.txt','utf-8',function(err, data) {
        if (err) {
            //如果去读出错，抛出错误后不会再执行后面的代码
            console.log(err);  
        }
        else{
        //读取数据放在data
        namelist = JSON.parse(data);
        }
    })
}

function readTelList(){
    fs.readFile('./public/data/tel.txt','utf-8',function(err, data) {
        if (err) {
            //如果去读出错，抛出错误后不会再执行后面的代码
            console.log(err);
        } 
        else{
        //读取数据放在data字符串 转化成
        tellist = JSON.parse(data);
        }
    })
}

function readAddList(){
    fs.readFile('./public/data/abgn.json','utf-8',function(err, data) {
        if (err) {
            //如果去读出错，抛出错误后不会再执行后面的代码
            console.log(err);
        } 
        else{
        //读取数据放在data字符串 转化成
        addresslist = JSON.parse(data);
        }
    })
}

//写入注册用户数据
function writeUserList(userData){
    fs.open("./public/data/user.txt", "w", (err, fd) => {
        if(err){console.log(err);}
        fs.writeFile(fd,userData, err => {// 2.写入文件
            if(err){console.log(err);}
        });
    });
}
function writeTelList(telData){
    fs.open("./public/data/tel.txt", "w", (err, fd) => {
        if(err){console.log(err);}
        fs.writeFile(fd,telData, err => {// 2.写入文件
            if(err){console.log(err);}
        });
    });
}

//写入扫描数据
function writeRecord(recordData){
    fs.open("./public/data/record.txt", "a", (err, fd) => {
        if(err){console.log(err);}
        fs.writeFile(fd,recordData, err => {// 2.写入文件
            if(err){console.log(err);}
        });
    });
}

function idToText(id1,id2,id3){
    let result = []
    for(let areaNum in addresslist.list){
    // addresslist.list.some(area=>{
        let area = addresslist.list[areaNum];
        if(area["id"] == id1){
            result.push(area["name"]);
            let _buildlist = area.list;
            for(let buildNum in _buildlist){
            // _buildlist.some(build=>{
                let build = _buildlist[buildNum];
                if(build["id"] == id2){
                    result.push(build["name"]);
                    let _grouplist = build.list;
                        for(let groupNum in _grouplist){
                    // _grouplist.some(group=>{
                        let group = _grouplist[groupNum]
                        if(group["id"] == id3){
                            result.push(group["name"]);
                            return result;
                        }
                    }
                }
            }
        }
    }
}
readUserList();
readTelList();
readAddList();



//社区信息部分

router.post("/upimg",singleUp,function(req,res){
    res.send({result:true,msg:req.file.filename});
})

router.post("/saveShareInfo",function(req,res){
    let jsonInfo = req.body.data;
    console.log(jsonInfo);
    fs.open("./public/data/shareinfo.json", "w", (err, fd) => {
        if(err){console.log(err);}
        fs.writeFile(fd,jsonInfo, err => {// 2.写入文件
            if(err){console.log(err);}
        });
    });
})



module.exports = router;