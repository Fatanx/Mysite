var express = require ('express');
var router = express.Router();
const fs=require('fs');
const path = require('path');

router.post('/test1',(req,res)=>{
    let text1 = req.body;
    res.send("123456");
})


router.get('/test2',(req,res)=>{
    let text1 = req.body;
    res.send("123456");
})

router.get('/getProject',(req,res)=>{
    let projects = '麻城项目,黄冈项目';
    res.send(projects);
})

router.post('/checkUser',(req,res)=>{
    let userList = {
        5556:'麻城项目',
        5892:'麻城项目',
        4379:'黄冈项目'
    }
    let key = req.body.key;
    let project = req.body.project;
    try{
        if( userList[key] == project) res.send('success')
        else res.send('fails');
    }
    catch{
        res.send('fails');
    }
})

router.get('/functionList',async function(req,res){
    let _path  = path.join(__dirname,"../public/data/jr/ip.json");
    console.log(1);
    let readResult =await readFile(_path);
    console.log(3);
    res.send(readResult);
})

function  readFile(_path){
    return new Promise((resolve,reject)=>{
        fs.readFile(_path,'utf-8',(err,data)=>{
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(data);
        })
    })
}


function writeFile(path,mode){
    let result = '';




    return result ;
}


module.exports = router;