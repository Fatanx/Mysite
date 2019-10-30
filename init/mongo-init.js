var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.Promise = Promise;

User.remove();

var userSchema = new mongoose.Schema({
  username:String,
  userpassword:String,
  usermail:String
});

const User = mongoose.model("User",userSchema);

const Admin = new User({
  username:"admin",
  userpassword:"123456",
  usermail:"test@mail.com"
})
Admin.save();
