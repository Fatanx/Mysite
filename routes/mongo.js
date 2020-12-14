//此模块全部迁移至MongoR&W.js 文件
// var router = require('express').Router();
// var MongoClient = require("mongodb").MongoClient;

// router.post('/saveArt', function(req, res) {
//     MongoClient.connect('mongodb://111.231.193.45:27015', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       }, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("test");
//         var myobj = {
//             title:req.body["title"],
//             date:Date.now(),
//             author:req.session.username,
//             content:req.body['content']
//         }
//         dbo.collection("articles").insertOne(myobj, function (err, result) {
//           if (err) res.send(err);
//           console.log("info","新文章数据已插入");
//           db.close();    
//           res.send({msg:"success"});
//         });
//       });
// });



//以上为重构部分
///////////////////////////////////////////////
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://fatan.xyz:27015/test', {useNewUrlParser: true,useUnifiedTopology: true});
// mongoose.Promise = Promise;

// let articleSchema = new mongoose.Schema({
//     title:String,
//     date:Date,
//     author:String,
//     content:String
// });
// const Article = mongoose.model("Article",articleSchema);

// router.post('/saveArt', function(req, res) {
//     const newArt = new Article({
//         title:req.body["title"],
//         date:Date.now(),
//         author:req.session.username,
//         content:req.body['content']
//     });
//     newArt.save();
//     res.send({msg:"success"});
// });

module.exports = router;