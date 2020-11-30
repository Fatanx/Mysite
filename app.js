var createError = require('http-errors');
var express = require('express');
var path = require('path');
var multer = require("multer")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var sessionMiddleware = session({
  store:new FileStore(),
  secret:'keyboard cat',
  cookie:{maxAge:36000000},
})



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(80);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',require("./routes/log&reg.js"));
app.use('/send_key',require("./routes/email.js"));
app.use('/check_in_or_out',require("./routes/users"));
app.use('/image',require("./routes/imagesup"));
      
app.use('/reg1',require("./routes/cj"));//抽奖程序
app.use('/QR',require("./routes/QR"));
// app.use('/ssms',require("./routes/sms/SendSms.js"));
app.use('/article',require("./routes/articleFiles/MongoR&W.js"));
app.use('/webService',require("./routes/webService.js"));
app.use('/mongo',require('./routes/mongo.js'));
app.use('/sendPhoneKey',require("./routes/SendSms"))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;