var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://fatan.xyz:27015/test', {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.Promise = Promise;

let articleSchema = new mongoose.Schema({
    title:String,
    date:Date,
    author:String,
    content:String
});
const Article = mongoose.model("Article",articleSchema);

router.post('/saveArt', function(req, res) {
    const newArt = new Article({
        title:req.body["title"],
        date:Date.now(),
        author:req.session.username,
        content:req.body['content']
    });
    newArt.save();
    res.send({msg:"success"});
});

module.exports = router;