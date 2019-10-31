var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.Promise = Promise;



var userSchema = new mongoose.Schema({
  username:String,
  userpassword:String,
  usermail:String
});
const User = mongoose.model("User",userSchema);

User.remove();

const Admin = new User({
  username:"admin",
  userpassword:"123456",
  usermail:"test@mail.com"
});
Admin.save();

const tuter = new User({
  username:"root",
  userpassword:"654321",
  usermail:"test@mail.com"
});
tuter.save();

// async function search(){
//   var user1 = await User.findOne({loginname:"admin"});
//   console.log(user1);
// }
// search();
