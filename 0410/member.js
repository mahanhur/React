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

  // res.render('member/member_register', { title: 'Express' });
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

router.post('/login', async function(req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = `select * from tb_member where userid='${userid}'`;
  let result = await commonDB.mysqlRead(sql);

  if(result.length ==0) {
    res.json( {"result":"fail", msg: "존재하지 않는 아이디 입니다." })
    return;
  }
  if(result[0]["password"] != password) {
    res.json( {"result":"fail", msg: "패스워드가 일치하지않습니다." })
    return;
  }
  req.session["username"] = result[0]["username"];
  req.session["userid"] = result[0]["userid"];
  req.session["email"] = result[0]["email"];
  
  console.log( result[0]["username"]);
  console.log( result[0]["userid"]);
  console.log( result[0]["email"]);

  res.json( {"result":"success", msg: "환영합니다." })
  });

router.use('/logout', async function(req, res, next) {
  // 세션에 있는 값 지우거나
  // 세션자체를 파괴

  //1. 세션에 있는 값 지우기(공란 할당)
  req.session["username"] = '';
  req.session["userid"] = '';
  req.session["email"] = '';
  res.redirect("/");
  //2. 세션 파괴
  // req.session.destroy();
  });

// router.use('/logincheck', async function(req, res, next) {
//   let userid = req.body.userid; //사용자단(클라)에서 userid
//   let password = req.body.password; //사용자단(클라)에서 userid
//   let sql = `select count(*) cnt from tb_member where userid='${userid}' and password='${password}'`
//   let rows = await commonDB.mysqlRead(sql);

//   let cnt = rows[0]["cnt"];
//   if(cnt == 1) {
//     res.json({"result":"success"});
//   } else {
//     res.json({"result":"fail"});
//   }  

//   res.render('member/member_logon', { title: 'Express' });
// });

router.get('/put', async function(req, res, next) {
  let userid = req.query.userid;
  req.session["userid"] = userid;
  console.log(req.session["userid"]);
});

module.exports = router;