var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("sumtest");
});
router.get('/sum', function(req, res, next) {
  res.render("ajax/sum");
});
//send함수가 적당히 알아서 데이터 보낸다
//http://localhost:3000/ajax/add?x=5&y=7 디버깅하여 제대로 보여지는지 확인
router.use('/result', function(req, res, next) {
  let name = req.query.name;
  let kor = parseInt(req.query.kor); 
  let eng = parseInt(req.query.eng);
  let mat = parseInt(req.query.math);
  let sum = kor + eng + mat;
  let avg = sum/3;

  res.json({
    name:name,
    sum:sum,
    avg:avg

  });
});

module.exports = router;