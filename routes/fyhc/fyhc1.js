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
function getAllRoomDate() {
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
                    allRoomNo = result;
                    console.log("info:","allRoomNo 已全部载入");
                }
            });
        }
    })
}




//客户端获取build
router.get('/getBulidNo', function (req, res) {
       
})
//客户端获取group
router.get('/getgroupNo', function (req, res) {
   
})
//客户端获取room
router.get('/getRoomNo', function (req, res) {
   
})






//getAllRoomDate();//启动服务的同时就加载进入服务端










    module.exports = router;