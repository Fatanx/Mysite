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
  MongoClient.connect('mongodb://111.231.193.45:27015', { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
  }, function(err, db) {
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
              db.close();
              res.send({msg:result});
            }
        });
      }
  });
});

//保存文章
router.post('/saveArt', function(req, res) {
  MongoClient.connect('mongodb://111.231.193.45:27015', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      var myobj = {
          title:req.body["title"],
          date:Date.now(),
          author:req.session.username,
          content:req.body['content']
      }
      dbo.collection("articles").insertOne(myobj, function (err, result) {
        if (err) res.send(err);
        console.log("info","新文章数据已插入");
        db.close();    
        res.send({msg:"success"});
      });
    });

});





module.exports = router;
