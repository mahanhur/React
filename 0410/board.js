let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* GET home page. */


router.get('/list/:pg', async function(req, res, next) {
  let pg = parseInt(req.params.pg);
  // pg=1 0~
  // pg=2 10~
  // pg=3 20~
  // ==> (pg-1)*10

  let sql=`   SELECT count(*) cnt
              FROM tb_board A 
              LEFT JOIN (SELECT @rownum:=0) B ON 1=1
              LEFT JOIN tb_member c ON a.writer = c.username
              `;
  let results = await commonDB.mysqlRead(sql,[]);
  let totalCnt = results[0]["cnt"];

  sql=`SELECT T.id, T.title, T.writer, T.num, T.username, date_format(T.wdate, '%Y-%m-%d') wdate 
        FROM (
        SELECT A.id, A.title, A.writer, A.wdate, c.username, @rownum:=@rownum+1 as num
          FROM tb_board A 
          LEFT JOIN (SELECT @rownum:=0) B ON 1=1
          LEFT JOIN tb_member c ON a.writer = c.userid
        ORDER BY id DESC
        ) T
        LIMIT ${(pg-1)*10}, 10`;
  
  results = await commonDB.mysqlRead(sql,[]);
  res.render('board/board_list', 
  {totalCnt:totalCnt, 
  session:req.session, 
  boardList: results,
  pg:pg,
  paging:commonUtil.getPaging(pg, totalCnt)
});
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
  let writer = req.session["userid"];

  sql=`INSERT INTO tb_board(title, writer, contents, wdate)
  VALUES('${title}', '${writer}', '${contents}', NOW());`;
  let results = await commonDB.mysqlRead(sql,[]);

  res.redirect("/board/list/1"); //강제이동
});

module.exports = router;
