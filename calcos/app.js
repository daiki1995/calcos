var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var mysql = require('mysql2');
var LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var totallingResultRouter = require('./routes/result');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//mysql接続
const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'calcos',
  password:'Popmen0408!'
});

module.exports=connection

connection.connect((err) => {
  if (err) {
      console.log('error connecting: ' + err.stack);
      return;
  }
});

/*ここからpassportの処理*/

// セッションミドルウェアの設定
app.use(session({resave:false,saveUninitialized:false,secret:'passport test'}))

app.use(passport.initialize());
app.use(passport.session());

var LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField:'id',
  passwordField:'password',
  passReqToCallback:true,
  session:false,
},function(req,username,password,done){
  process.nextTick(function(){
    const sql='select * from user where user_id=?'//where user_id=？
    //console.log(username)
    connection.query(sql,username,function(err,result){
      console.log(result)

      loginData=result[0]
      console.log(loginData)
      if (err) return done(err)
      if (!loginData) return done(null, false, { message: 'account does not exist' })

      
      if(password==loginData.user_pas){
        return done(null, username)
      }else{
        return done(null, false, { message: 'パスワードが正しくありません。' })
      }
      
    })

    /*単一のユーザーネームとパスワード
    if (username === "test" && password === "test") {
      console.log("login success")
      return done(null, username)
    } else {
      console.log("login error")
      return done(null, false, { message: 'パスワードが正しくありません。' })
    }
    */

  })
}));

passport.serializeUser(function (user, done) {
  done(null, user);
  console.log('siri')
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
//ここまでpassportの処理


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/result', totallingResultRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
