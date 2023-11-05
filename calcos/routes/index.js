var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

//mysql接続
const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'calcos',
  password:'Popmen0408!'
});

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(process.cwd()+'/calcos/views/app.html');
});

/*ログイン画面関係*/
router.get('/login',function(req,res,next){
  res.sendfile(process.cwd()+'/calcos/views/login.html');
});

/*ログインPOST*/
router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/faile',
  session: true
}));

/*新規登録画面関係*/
router.get('/singup',function(req,res,next){
  res.sendfile(process.cwd()+'/calcos/views/singup.html');
})

/*新規登録をする際の動き*/
router.post('/signup',signup,passport.authenticate('local', {//成功した際のログイン処理
  successRedirect: '/success',
  failureRedirect: '/faile',
  session: true
}));
  
  function signup(req,res,next){
    const select_sql='SELECT user_no,user_id from user WHERE user_id=?';
    const insert_sql='INSERT INTO user (user_id,user_pas,user_email,user_record_data) VALUES (?,?,?,?)';

    connection.query(select_sql,[req.body.id],function(error,result,fields){
      console.log(error);
      //console.log(result);

      console.log('datetime'+req.body.datetime)

      if(result.length===0){//未登録のユーザーIDの時
        connection.query(insert_sql,[req.body.id,req.body.password,req.body.email,req.body.datetime],function(error,result,fields){
          console.log(error);
          //console.log(result);
          next();
        })
      }else{//登録済みの時
        console.log('既に登録済みのユーザーです。')
        res.send({loginCK:false})
      }
  })
}    


/*ログイン成功時読み込み*/
router.get('/success', function(req,res,next){
  //res.send({loginUser:req.user})
  res.send({loginCK:true})
});

/*ログイン失敗時読み込み*/
router.get('/faile', function(req,res,next){
  res.send({loginCK:false})
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
