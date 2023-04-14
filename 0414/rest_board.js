let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

// http://localhost:9090/rest_board/list/1
/* GET home page. */
router.get('/list/:pg', async function(req, res, next) {
  let pg = parseInt(req.params.pg);
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
        ORDER BY id
        ) T
        LIMIT ${(pg-1)*10}, 10`;
  
  results = await commonDB.mysqlRead(sql,[]);
  res.json({totalCnt:totalCnt, boardList: results, pg:pg,}); //응답완료
  //한 함수내에서 res.json 호출하고 또다시 res.send나 render나 json 호출 못함
});

router.get('/view/:id', async function(req, res, next) {
  let id = req.params.id;
  // sql=`select id, title, writer, hit, contents, 
  // date_format(wdate, '%Y-%m-%d') wdate from tb_board
  // where id=${id}`;

  let sql = `select A.id, A.title, A.writer, A.hit, A.contents, date_format(A.wdate, '%Y-%m-%d') wdate, (select username from tb_member B where A.writer = B.username) username from tb_board A where id=${id}`;
  let results = await commonDB.mysqlRead(sql,[]);
  // console.log(results);
  if(results.length==0) {
    res.json({results:"fail", msg:"데이터가 없음"});
    return;
  }
  res.json({result:"success", msg:"", boardData:results[0]});
});




// checkInfos=[
//   {key:"title", type:"str", range:200},
//   {key:"writer", type:"str", range:40},
//   {key:"contents", type:"str", range:-1}
// ]
// //수행결과값이 0이면 문제없음, 다른 숫자가 오면 오류
// insertInfo = commonUtil.checkInfo(req,checkInfos);
// if(insertInfo["results"]!=0) {
//   res.json({insertInfo});
//   return;
// }
router.post('/write', async function(req, res, next) {
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  let sql=`select count(*) cnt from tb_member where userid='${writer}'`;
  results = await commonDB.mysqlRead(sql, []);

  if(results[0]["cnt"]==0) {
    res.json({result:"fail", msg:"해당하는 id가 없습니다."});
    return;
  }
    
  sql = `INSERT INTO tb_board(title, writer, contents, wdate)
  VALUES('${title}', '${writer}', '${contents}', NOW());`;
  result = await commonDB.mysqlRead(sql,[]);

  res.json({"result":"success", msg:"등록성공"});
});






router.use('/save', async function(req, res, next) {
  let title=req.body.title;
  let contents=req.body.contents;
  let writer ="test2";

  sql=`INSERT INTO tb_board(title, writer, contents, wdate)
  VALUES('${title}', '${writer}', '${contents}', NOW());`;
  let results = await commonDB.mysqlRead(sql,[]);

  if(results.length==0) {
    res.json({results:"fail", msg:"등록실패"})
  } 
  res.json({results:"success", msg:"등록성공"})

  res.redirect("/board/list/1"); //강제이동
});

module.exports = router;
