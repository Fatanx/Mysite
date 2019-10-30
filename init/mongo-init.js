var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.Promise = Promise;



var userSchema = new mongoose.Schema({
  username:String,
  userpassword:String,
  usermail:String
});
const User = mongoose.model("User",userSchema);


async function remove_all(){
  await User.remove();
}
remove_all();

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
exit();
