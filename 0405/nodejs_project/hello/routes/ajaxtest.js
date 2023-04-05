var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("ajaxtest");
});
router.get('/ajaxtest2', function(req, res, next) {
  res.render("ajax/ajaxtest2");
});
//send함수가 적당히 알아서 데이터 보낸다
//http://localhost:3000/ajax/add?x=5&y=7 디버깅하여 제대로 보여지는지 확인
router.use('/add', function(req, res, next) {
  let x = parseInt(req.query.x);
  let y = parseInt(req.query.y);
  let z = x + y;
  res.json({result:z});
});

module.exports = router;
