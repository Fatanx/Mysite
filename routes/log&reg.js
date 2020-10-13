var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://fatan.xyz:27015/test', {useNewUrlParser: true});
mongoose.Promise = Promise;


var userSchema = new mongoose.Schema({
  username:String,
  userpassword:String,
  usermail:String
});
mongoose.model("User1",userSchema);
const User1 = mongoose.model("User");


/* GET home page. */
router.get('/check', function(req, res, next) {
  if(req.body["loginname"]=="123"){
    res.send({msg:"登录成功"})
  }
  else{
    res.send({msg:"错误登录信息"})
  }
});

router.post('/reg',function(req,res,next){
  let user = new User1({
    username:req.body["regname"],
    userpassword:req.body["regpassword"],
    usermail:req.body["regmail"],
  });
  user.save((err,msg)=>{
    if(err) {
      console.log(err);
      res.send(err);
    }
    else{
      console.log(msg);
      res.send("save completed");
    }
  });
});


module.exports = router;
