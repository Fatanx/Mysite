const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const sha = crypto.createHash("sha256")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.Promise = Promise;

//建立User类
var userSchema = new mongoose.Schema({
  username:String,
  userpassword:String,
  usermail:String
});
mongoose.model("User",userSchema);
const User = mongoose.model("User");

async function saveUser(username,userpassword,useremail){
  var user = new User({
    username:username,
    userpassword:userpassword,
    usermail:useremail
  });
}


async function readUser(usern,userp,res,req){
  const user =  await User.findOne({username:usern});
  if(user != null){
      if(user["userpassword"] == userp){
        console.log(usern + "登录成功");
        req.session.username = usern;
        res.send({msg:"登录成功"});
      }
      else{
        res.send({msg:"错误登录名或密码"});
        console.log(usern + "错误登录名或密码");
      }
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username == null){
    res.render('index', { title: 'Express' });
  }
  else{
    res.render('jump');
  };
});

router.post('/checkuser',function(req,res){
  console.log(req.session);
  readUser(req.body["loginname"],req.body["loginpassword"],res,req);
})


module.exports = router;
