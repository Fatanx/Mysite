const express = require('express');
const router = express.Router();
const crypto = require('crypto');
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
 const text="人之初，性本善。性相近，习相远。苟不教，性乃迁。教之道，贵以专。昔孟母，择邻处。子不学，断机杼。窦燕山，有义方。教五子，名俱扬。养不教，父之过。教不严，师之惰。子不学，非所宜。幼不学，老何为。玉不琢，不成器。人不学，不知义。为人子，方少时。亲师友，习礼仪。香九龄，能温席。孝于亲，所当执。融四岁，能让梨。弟于长，宜先知。首孝悌，次见闻。知某数，识某文。一而十，十而百。百而千，千而万。三才者，天地人。三光者，日月星。三纲者，君臣义。父子亲，夫妇顺。曰春夏，曰秋冬。此四时，运不穷。曰南北，曰西东。此四方，应乎中。曰水火，木金土。此五行，本乎数。十干者，甲至癸。十二支，子至亥。曰黄道，日所躔。曰赤道，当中权。赤道下，温暖极。我中华，在东北。曰江河，曰淮济。此四渎，水之纪。曰岱华，嵩恒衡。此五岳，山之名。曰士农，曰工商。此四民，国之良。曰仁义，礼智信。此五常，不容紊。地所生，有草木。此植物，遍水陆。有虫鱼，有鸟兽。此动物，能飞走。稻粱菽，麦黍稷。此六谷，人所食。马牛羊，鸡犬豕。此六畜，人所饲。曰喜怒，曰哀惧。爱恶欲，七情具。青赤黄，及黑白。此五色，目所识。酸苦甘，及辛咸。此五味，口所含。膻焦香，及腥朽。此五臭，鼻所嗅。匏土革，木石金。丝与竹，乃八音。曰平上，曰去入。此四声，宜调协。高曾祖，父而身。身而子，子而孙。自子孙，至玄曾。乃九族，人之伦。父子恩，夫妇从。兄则友，弟则恭。长幼序，友与朋。君则敬，臣则忠。此十义，人所同。当师叙，勿违背。斩齐衰，大小功。至缌麻，五服终。礼乐射，御书数。古六艺，今不具。惟书学，人共遵。既识字，讲说文。有古文，大小篆。隶草继，不可乱。若广学，惧其繁。但略说，能知原。凡训蒙，须讲究。详训诂，明句读。为学者，必有初。小学终，至四书。论语者，二十篇。群弟子，记善言。孟子者，七篇止。讲道德，说仁义。作中庸，子思笔。中不偏，庸不易。作大学，乃曾子。自修齐，至平治。孝经通，四书熟。如六经，始可读。诗书易，礼春秋。号六经，当讲求。有连山，有归藏。有周易，三易详。有典谟，有训诰。有誓命，书之奥。我周公，作周礼。著六官，存治体。大小戴，注礼记。述圣言，礼乐备。曰国风，曰雅颂。号四诗，当讽咏。诗既亡，春秋作。寓褒贬，别善恶。三传者，有公羊。有左氏，有谷梁。经既明，方读子。撮其要，记其事。五子者，有荀扬。文中子，及老庄。经子通，读诸史。考世系，知始终。自羲农，至黄帝。号三皇，居上世。唐有虞，号二帝。相揖逊，称盛世。夏有禹，商有汤。周文武，称三王。夏传子，家天下。四百载，迁夏社。汤伐夏，国号商。六百载，至纣亡。周武王，始诛纣。八百载，最长久。周辙东，王纲坠。逞干戈，尚游说。始春秋，终战国。五霸强，七雄出。嬴秦氏，始兼并。传二世，楚汉争。高祖兴，汉业建。至孝平，王莽篡。光武兴，为东汉。四百年，终于献。魏蜀吴，争汉鼎。号三国，迄两晋。宋齐继，梁陈承。为南朝，都金陵。北元魏，分东西。宇文周，与高齐。迨至隋，一土宇。不再传，失统绪。唐高祖，起义师。除隋乱，创国基。二十传，三百载。梁灭之，国乃改。梁唐晋，及汉周。称五代，皆有由。炎宋兴，受周禅。十八传，南北混。辽与金，皆称帝。元灭金，绝宋世。舆图广，超前代。九十年，国祚废。太祖兴，国大明。号洪武，都金陵。迨成祖，迁燕京。十六世，至崇祯。权阉肆，寇如林。李闯出，神器焚。清世祖，膺景命。靖四方，克大定。由康雍，历乾嘉。民安富，治绩夸。道咸间，变乱起。始英法，扰都鄙。同光后，宣统弱。传九帝，满清殁。革命兴，废帝制。立宪法，建民国。古今史，全在兹。载治乱，知兴衰。史虽繁，读有次。史记一，汉书二。后汉三，国志四。兼证经，参通鉴。读史者，考实录。通古今，若亲目。昔仲尼，师项橐。古圣贤，尚勤学。赵中令，读鲁论。彼既仕，学且勤。披蒲编，削竹简。彼无书，且知勉。头悬梁，锥刺股。彼不教，自勤苦。如囊萤，如映雪。家虽贫，学不辍。如负薪，如挂角。身虽劳，犹苦卓。苏老泉，二十七。始发愤，读书籍。彼既老，犹悔迟。尔小生，宜早思。若梁灏，八十二。对大廷，魁多士。彼既成，众称异。尔小生，宜立志。莹八岁，能咏诗。泌七岁，能赋棋。彼颖悟，人称奇。尔幼学，当效之。蔡文姬，能辩琴。谢道韫，能咏吟。彼女子，且聪敏。尔男子，当自警。唐刘晏，方七岁。举神童，作正字。口而诵，心而惟。朝于斯，夕于斯。晏虽幼，身已仕。有为者，亦若是。犬守夜，鸡司晨。苟不学，曷为人。蚕吐丝，蜂酿蜜。人不学，不如物。幼而学，壮而行。上致君，下泽民。扬名声，显父母。光于前，裕于后。人遗子，金满赢。我教子，唯一经。勤有功，戏无益。戒之哉，宜勉力"
 const _arr = text.split('。');
 let  mail_content = "";
 for(var i =0;i<10;i++){
    mail_content = mail_content +"\n"+ _arr[Math.round(Math.random()*_arr.length)];
 };

  let randomNum = Math.round(Math.random()*10000);
  let randomNum_key = '';
  let mmd5 = crypto.createHash("md5");
  mmd5.update(randomNum+'');
  randomNum_key = mmd5.digest('hex');
  console.log(randomNum);
  console.log(req.body['email']);
  const mailOptions = {
    from:"谈校<fatanxyz@163.com>",
    cc:"fatanxyz@163.com",
    to:req.body['email'],
    subject:"发送key用的邮件",
    text:"key:" + randomNum + "\n这是前端开发学习者开发的网站发出的邮件.\n网站目前还很简陋,感谢支持"+"\n\n\n"+mail_content
  }
  await transport.sendMail(mailOptions,(error,info)=>{
    if (error) {
      res.send({msg:error})
    }
    else{
      res.send({msg:"success!",key:randomNum_key})
    };
  });
});

module.exports = router;
