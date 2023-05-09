var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(process.cwd()+'/calcos/views/register.html');
});

module.exports = router;