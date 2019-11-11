const router = require("express").Router();
const multer = require("multer");
const upload = multer({
  dest:"./upload"
});

const single = upload.single("myfile");//单独上传
const arr = upload.array("myfiles",3);
const fields = upload.fields([
  {name:"f1",maxCount:1},
  {name:"f2",maxCount:3}
]);

router.post("/upimage",single,function(req,res){
  res.send(req.file);
});

module.exports = router;
