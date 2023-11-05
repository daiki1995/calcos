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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(process.cwd()+'/calcos/views/register.html');
});

//パスポートで承認取れているか確認
router.get('/login', function(req, res, next) {
  res.send({user:req.user});
});

//カロリー登録POST
router.post('/regcal',function(req,res,next){
  const sql='INSERT INTO eat_food (user_id,food,cal,eat_date) VALUES (?,?,?,?)';
  
  connection.query(sql,[req.body.user,req.body.food,req.body.cal,req.body.eat_date],function (error, results, fields){
    console.log(error);
  });
});

module.exports = router;