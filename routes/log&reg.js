var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/check', function(req, res, next) {
  if(req.body["loginname"]=="123"){
    res.send({msg:"登录成功"})
  }
  else{
    res.send({msg:"错误登录信息"})
  }
});


module.exports = router;
