var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB')

/* GET home page. */
router.get("/list", async function(req, res, next) {
  let sql = `SELECT a.id, a.score_name, a.score_kor,a.score_eng,a.score_math, DATE_FORMAT(a.wdate, '%Y-%m-%d') wdate
  FROM tb_score a`;

  let results = await commonDB.mysqlRead(sql, []);
  console.log(results);
  res.json(results);

  // res.json(
  //   [
  //     {id:1, name:"이순신", desc:"임진왜란 승리"},
  //     {id:2, name:"강감찬", desc:"귀주대첩"},
  //     {id:3, name:"을지문덕", desc:"살수대첩"},
  //     {id:4, name:"세종대왕", desc:"한글창제"},
  //     {id:5, name:"문종", desc:"자격루"},
  //   ]
  // );
});

router.post('/write', async function(req, res, next) {
  try {
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `INSERT INTO tb_hero(hero_name, hero_desc, wdate)
    VALUES(?,?,NOW())`;

    let result = await commonDB.mysqlRead(sql, [hero_name, hero_desc]);
    res.json({"result":"success"});
  } catch(e){
    console.log(e);
    res.json({"result":"fail"});
  }
})
//http://localhost:9090/hero/view/1
router.get('/view/:id', async function(req, res, next) {
  try {
    let id = req.params.id
    let sql = `select * from tb_score where id=${id}`;

    let results = await commonDB.mysqlRead(sql, []);
    res.json({"result":"success", "score":results[0]});
  } catch(e){
    console.log(e);
    res.json({"result":"fail"});
  }
})

// router.post('/update', async function(req, res, next) {
//   try {
//     let id = req.body.id
//     let score_name = req.body.score_name;
//     let score_kor = req.body.score_kor;
//     let score_eng = req.body.score_eng;
//     let score_math = req.body.score_math;

//     let sql = `update tb_score set score_name=?, score_kor=?, score_eng=?, score_math=? where id=?`;
//     await commonDB.mysqlRead(sql, [score_name, score_kor,score_eng,score_math, id]);
//     res.json({"result":"success"});
//   } catch(e){
//     console.log(e);
//     res.json({"result":"fail"});
//   }
// })

module.exports = router;
