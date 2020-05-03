/*
mongoose.set('useCreateIndex', true);作用是允许使用 index 唯一键
schema.remove({参数})用来删除指定匹配数据
_schema.save（{}）用来存储数据




*/




// var mongoose = require('Mongodb').MongoClient;
//
// mongoose.connect('mongodb://111.231.193.45/test', {useNewUrlParser: true},function(err,db){
//   if(err)  console.log(err);
//   console.log("111");
//   var dbase = db.db("test");
//   dbase.createCollection('User',function(err,res){
//     if(err)    console.log(err);
//     console.log("创建集合");
//     db.close();
//   })
// });

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://111.231.193.45/test', {useNewUrlParser: true});
mongoose.Promise = Promise;
  var userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    userpassword:String,
    usermail:String,
    usertel:String
  });
  const User = mongoose.model("User",userSchema);
  //先删除所有生成的数据
  User.deleteMany({username:"admin"},function(err,msg){
    if(err) console.log(err);
    console.log(msg);
  });

  const Admin = new User({
    username:"admin",
    userpassword:"123456",
    usermail:"test@mail.com",
    usertel:"13348297593"
  });
  Admin.save(function(err,msg){
    if(err) console.log(err);
    console.log(msg,"用户信息添加成功");
  });

  var articleSchema = new mongoose.Schema({
    title:String,
    date:Date,
    author:String,
    content:String
  });
  const Article = mongoose.model("Article",articleSchema);
  Article.remove({author:'fatan_demo'},(err,msg)=>{
    if(err) console.log(err);
    else{
      const article1 = new Article({
        title:"第一篇文章",
        date:1453639953341,
        author:"fatan_demo",
        content:"这是第一篇文章，属于手动生成的，只是为了测试程序"
      })
      article1.save((err,msg)=>{
        if(err) console.log(err);
        console.log(msg,"第一篇文章信息添加成功");
      })
      const article2 = new Article({
        title:"第二篇文章",
        date:1453639958341,
        author:"fatan_demo",
        content:"这是第二篇文章，属于手动生成的，只是为了测试程序"
    })
    article2.save((err,msg)=>{
      if(err) console.log(err);
      console.log(msg,"第二篇文章信息添加成功");
    })
    const article3 = new Article({
        title:"再别康桥",
        date:1453639963341,
        author:"fatan_demo",
        content:"轻轻的我走了，<br/>\正如我轻轻的来；<br/>\我轻轻的招手，<br/>\作别西天的云彩。<br/>\<br/>\那河畔的金柳，<br/>\是夕阳中的新娘；<br/>\波光里的艳影，<br/>\在我的心头荡漾。<br/>\软泥上的青荇，<br/>\油油的在水底招摇；<br/>\在康河的柔波里，<br/>\我甘心做一条水草！<br/>\<br/>\那榆荫下的一潭，<br/>\不是清泉，<br/>\是天上虹；<br/>\揉碎在浮藻间，<br/>\沉淀着彩虹似的梦。<br/>\梦？撑一支长篙，<br/>\向青草更青处漫溯；<br/>\满载一船星辉，<br/>\在星辉斑斓里放歌。<br/>\但我不能放歌，<br/>\悄悄是别离的笙箫；<br/>\夏虫也为我沉默，<br/>\沉默是今晚的康桥！<br/>\<br/>\  悄悄的我走了，<br/>\正如我悄悄的来；<br/>\我挥一挥衣袖，<br/>\不带走一片云彩。"
      })
      article3.save((err,msg)=>{
        if(err) console.log(err);
        console.log(msg,"第三篇文章信息添加成功");
      })
      console.log(msg);
    }
  });
