var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


router.post("/send",async function(req,res){
  const transport = nodemailer.createTransport({
    service: 'smtp.163.com',
    host: "smtp.163.com",
    secure: true,
    port:465,
    auth:{
      user:"fatanxyz@163.com",
      pass:"fatanxyz163com"
    }
  });
  const randomNum = Math.round(Math.random()*10000);
  console.log(randomNum);

  console.log(req.body['email']);
  const mailOptions = {
    from:"fatanxyz@163.com",
    to:req.body['email'],
    subject:"test code",
    text:"感谢您对我们的支持,test key is"+randomNum
  }
  console.log(mailOptions);
  await transport.sendMail(mailOptions,(error,info)=>{
    if (error) {res.send(error)}
    else(res.send("success!"));
  });
  // transport.sendmail(mailOptions,(error,info)=>{
  //   console.log(req.body['email']);
  //   if (error) {console.log(error); }
  //   console.log('Message sent: %s', info.messageId);
  // });
});

module.exports = router;
