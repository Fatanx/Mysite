var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


router.get("/send",function(req,res){
  const transport = nodemailer.createTransport({
    service:"163",
    secure:true,
    auth:{
      user:"fatanxyz@163.com",
      pass:"fatanxyz163com"
    }
  })
  let mailOptions = {
    from:"fatanxyz@163.com",
    to:req.email,
    subjec:"注册验证",
    text:"感谢您对我们的支持,验证码是\'nb!\'"
  }

})




module.exports = router;
