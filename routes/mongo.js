var router = require('express').Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://fatan.xyz:27015/test', {useNewUrlParser: true});
mongoose.Promise = Promise;

let articleSchema = new mongoose.Schema({
    title:String,
    date:Date,
    author:String,
    content:String
});
const Article = mongoose.model("Article",articleSchema);

router.post('/saveArt', function(req, res, next) {
    console.log(req.body,req.session.username);
    const newArt = new Article({
        title:req.body["title"],
        date:Date.now(),
        author:req.session.username,
        content:req.body['content']
    });
    newArt.save();
    res.send("success!");
});

module.exports = router;