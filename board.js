let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
router.get('/', async function(req, res, next) {
  sql=`select id, title, writer, contents, 
  date_format(wdate, '%Y-%m-%d') wdate from tb_board`;
  
  let results = await commonDB.mysqlRead(sql,[]);
  res.render('board/board_list', { boardList: results});
});

router.get('/view/:id', async function(req, res, next) {
  let id = req.params.id;
  sql=`select id, title, writer, hit, contents, 
  date_format(wdate, '%Y-%m-%d') wdate from tb_board
  where id=${id}`;
  
  let results = await commonDB.mysqlRead(sql,[]);
  // console.log(results);
  res.render('board/board_view', { item: results[0]});
});

router.get('/write', async function(req, res, next) {
  res.render('board/board_write');
});

router.use('/save', async function(req, res, next) {
  let title=req.body.title;
  let contents=req.body.contents;
  let writer=req.body.writer;

  sql=`INSERT INTO tb_board(title, writer, contents, wdate)
  VALUES('${title}', '${writer}', '${contents}', NOW());`;
  let results = await commonDB.mysqlRead(sql,[]);

  res.redirect("/board"); //강제이동
});

module.exports = router;
