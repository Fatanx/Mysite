var express = require ('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/check",function(req,res,next){
  if(req.session.username == null){
    res.send({msg:'out'});
  }
  else{
    res.send({msg:'in'});
  }
});

router.get('/logout',function(req,res,next){
  req.session.username = null;
  res.send("您已退出");
})

module.exports = router;
