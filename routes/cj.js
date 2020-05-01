const express = require('express');
const router = express.Router();


var namelist ={};



router.post("/add_name",function(req,res){
  let na = [];
  

  if(namelist[req.body.tel] ){
    if(namelist[req.body.tel][1] == req.body.tel&& namelist[req.body.tel][0] == req.body.name){
      req.session.user = req.body.tel;      
      res.send({msg:"账号存在，已成功登录",result:true});
    }
    else{
      res.send({msg:"已经存在的手机号!",result:false});
    }
  }
  else{
    na.push(req.body.name);
    na.push(req.body.tel);
    namelist[req.body.tel] = na;
    console.log(namelist);
    req.session.user = req.body.tel;
    res.send({msg:"注册成功",result:true});
  }

});


router.get("/cjj",function(req,res){
  let user = req.session.user;
  console.log(namelist);
  let result = '';
  if(namelist[user].length == 2){
    try{
      let namelenNum = namelist[user][0].split('').length;
      let timestamp = (new Date()).valueOf().toString().split('');//获取当前毫秒的时间戳，准确！
      let _tel = namelist[user][1].split('');
      let randomNum = Math.floor(Math.random()*10);
      let timeaddNum = 0;
      for(let i = 0 ; i < timestamp.length;i++){
        timeaddNum = timeaddNum + Number(timestamp[i]);
      }
      timeaddNum = timeaddNum % 10;
      let teladdNum = 0;
      for(let i = 0 ; i < _tel.length;i++){
        teladdNum = teladdNum + Number(_tel[i]);
      }
      teladdNum = teladdNum % 10;
      let _ge = (namelenNum + timeaddNum + teladdNum)%10;
      let NNumber =   _ge.toString() + randomNum.toString();
      result = namelenNum + '+' + timeaddNum +'+' + teladdNum + '+' + NNumber;
    }
    catch{
      result = '0+0+0+0';
    }
    namelist[user].push(result);
  }
  else if(namelist[user].length == 3){
    result = namelist[user][2];
  };
  console.log(namelist);
  
  res.send({msg:result});
});

router.get("/checklogin",function(req,res){
  let user = req.session.user;
  console.log(user);
  
  if(user!=null){
    res.send({msg:"login!"});
  }
  else{
    res.send({msg:"jump"});
  }
});

router.get("/getall",function(req,res){
  let _all ='';
  console.log(namelist);
  for(let key in namelist){
    let name_num = '';
    if(namelist[key].length > 2){
      name_num = namelist[key][0] + '+' +namelist[key][2] + '+' + key + ','  ;
      _all= _all + name_num;
    }
  }
  res.send({msg:_all});
});

router.post("/oppass",function(req,res){
  let pass = req.body.pass;
  if(pass == "123456"){
    res.send({msg:"成功",result:true})
  }
  else{
    res.send({msg:"错误的管理密码",result:false})
  }
})

router.post("/delscore",function(req,res){
  let key = req.body.key;
  // delete namelist[key];
  namelist[key].pop();
  console.log(namelist);
  
  res.send({msg:"success!",result:true});
})


module.exports = router;
