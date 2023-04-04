let express = require("express");
let fs = require("fs");
let ejs = require("ejs");

let app = express(); //서버 만들었음

// bodyParse -- 기존에는 반드시 npm에서 다운로드 필요했음
// but 지금은 express가 기본적으로 갖고있음(뉴버전에서)
// post로 전송할 때 req.body에 보낸 정보를 추가해서 
// 사용이 간편하도록 도와주는 미들웨어
app.use(express.urlencoded({extenede:false}));

app.get("/input", (req, res) => {
  fs.readFile("./html/input.html", "utf-8", (err, data) => {
    res.writeHead(200, {"Content-type":"text/html"});
    res.end(ejs.render(data));
  });
});
//http://127.0.0.1:3000/login?userid=test&password=1234
app.get("/login", (req, res) => {
  let userid = req.query.userid; //input태그의 name속성
  let password = req.query.password;
  
  if( userid == "test" && password == "1234") {
    res.send("login success");
  } else {
    res.send("login fail");
  }
});

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});