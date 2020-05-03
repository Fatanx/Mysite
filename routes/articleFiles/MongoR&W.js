/*
 此文件只允许读写‘mongodb://fatan.xyz/test/articles’文件
 articles:{
   username:{type:String,unique:true},
   userpassword:String,
   usermail:String,
   usertel:String
}
*/
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

//添加文章

//获得所有文章

router.post("/getall",function(req,res){
  MongoClient.connect('mongodb://111.231.193.45', { useNewUrlParser: true }, function(err, db) {
      if (err) {
          console.log(err);
          res.send({msg:err});
      }
      else{
        var dbo = db.db("test");
        dbo.collection("articles").find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) {
              console.log(err);
              db.close();
              res.send({msg:err});
            }
            else {
              console.log(result);
              db.close();
              res.send({msg:result});
            }
        });
      }
  });
});


module.exports = router;
