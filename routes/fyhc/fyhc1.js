const express = require('express');
const router = express.Router();

var MongoClient = require('mongodb').MongoClient;


/* 示例代码
router.get('/check', function(req, res, next) {
  });
  
  router.post('/reg',function(req,res,next){
  });
*/
let allRoomNo;
function getAllRoomData() {
    console.log("info:","正在加载 allRoomNo");
    MongoClient.connect('mongodb://111.231.193.45:27015', {
        useNewUrlParser: true,useUnifiedTopology:true
    }, function (err, db) {
        if (err) {
            console.log(err);
        } else {
            var dbo = db.db("fyhc");
            dbo.collection("RoomNo").find({}).toArray(function (err, result) { // 返回集合中所有数据
                if (err) {
                    db.close();
                } else {
                    db.close();
                    let a={};
                    result.forEach(rNo=>{
                        a[rNo["buildNo"]] = {};
                    })
                    result.forEach(rNo=>{
                        a[rNo["buildNo"]][rNo["groupNo"]] = {};
                    })
                    let countA = 0;
                    result.forEach(rNo=>{
                        a[rNo["buildNo"]][rNo["groupNo"]][rNo["_id"]] = rNo["roomNo"];
                    })
                    allRoomNo = a;
                    console.log("info:","allRoomNo 已全部载入");
                }
            });
        }
    })
}




//客户端获取build
router.post('/getBulidNo', function (req, res) {
    let result = [];
    for(var bn in allRoomNo){
        result.push(bn);
    }
    res.send(result);
})
//客户端获取group
router.post('/getGroupNo', function (req, res) {
   let result = [];
   let buildNo = req.body.No;
   for(var gn in allRoomNo[buildNo])
   {
       result.push(gn)
   }
   res.send(result);
})
//客户端获取room
router.post('/getRoomNo', function (req, res) {
    let result = [];
    let buildNo = req.body.bNo;
    let groupNo = req.body.No;
    console.log(buildNo,groupNo);
    console.log(allRoomNo[buildNo][groupNo]);

   for(var key in allRoomNo[buildNo][groupNo])
   {
       result.push(allRoomNo[buildNo][groupNo][key])
   }
    res.send(result);
})


getAllRoomData();//启动服务的同时就加载进入服务端

    module.exports = router;