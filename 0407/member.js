let express = require('express'); //node_modules 폴더에 있으면 경로 필요없음
let router = express.Router();
let commonDB = require("./commonDB"); //노드모듈 폴더에 없으면 경로지정 해줘야함

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('member/member_register', { title: 'Express' });
});

//register시 아이디중복 체크
//1. 클라이언트로부터 id받는다
//2. 받아온 id를 db에가서 존재하는지 유무 체크
//3. 존재하면 fail 리턴 / 존재하지 않으면 success를 리턴(사용가능) 
router.use('/idcheck', async function(req, res, next) {
  let userid = req.body.userid; //사용자단(클라)에서 userid
  let sql = `select count(*) cnt from tb_member where userid='${userid}'`
  let rows = await commonDB.mysqlRead(sql);
  
  let cnt = rows[0]["cnt"];
  if(cnt == 0) {
    res.json({"result":"success"});
  } else {
    res.json({"result":"fail"});
  }  

  res.render('member/member_register', { title: 'Express' });
});

router.use('/save', async function(req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let nickname = req.body.nickname;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;

  let sql = `insert into tb_member (userid, password, username, nickname, email, phone, zipcode, address1, address2, wdate) values(?,?,?,?,?,?,?,?,?,now())`;
  try {
  await commonDB.mysqlRead(sql, [userid, password, username, nickname, email, phone, zipcode, address1, address2]);
  //mysqlRead params인자에 ???인경우 써주고 sql에 ${} 직접써주면 쓸 필요 없고
  res.json({"result":"success"});
  } catch (e) {
    console.log( e )
    res.json({"result":"fail"});
  };
  
});

router.get('/login', async function(req, res, next) {
  res.render("member/member_logon")
});

router.use('/logincheck', async function(req, res, next) {
  let userid = req.body.userid; //사용자단(클라)에서 userid
  let password = req.body.password; //사용자단(클라)에서 userid
  let sql = `select count(*) cnt from tb_member where userid='${userid}' and password='${password}'`
  let rows = await commonDB.mysqlRead(sql);

  let cnt = rows[0]["cnt"];
  if(cnt == 1) {
    res.json({"result":"success"});
  } else {
    res.json({"result":"fail"});
  }  

  res.render('member/member_logon', { title: 'Express' });
});

router.get('/put', async function(req, res, next) {
  let userid = req.query.userid;
  req.session["userid"] = userid;
  console.log(req.session["userid"]);
});

module.exports = router;