var express = require('express');
var router = express.Router();
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
  await user.save();
}


async function readUser(usern,userp,res){
  const user =  await User.findOne({username:usern});
  if(user != null){
      if(user["userpassword"] == userp){
        res.send({msg:"登录成功"});
      }
      else{
        res.send({msg:"错误登录名或密码"});
      }
    }
  res.send({msg:"错误登录名或密码"});
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/checkuser',function(req,res){
  readUser(req.body["loginname"],req.body["loginpassword"],res);
})


module.exports = router;
