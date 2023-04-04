let express = require("express");
let app = express(); //서버 만들었음

app.use( (req, res, next) => {
// req : 브라우저 -> 서버
// res : 서버 -> 브라우저
// next : 소스상 다음 함수를 호출한다
  req.name="홍길동";
  res.name="동길홍";
  req.phone="010-3333-4444";
  console.log("aaaa");
  next();
});

app.use( (req, res, next) => {
  req.name="홍동길";
  res.address="영등포구";
  console.log("bbbbb");
  next();
});

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  console.log(req.name);
  console.log(res.name);
  console.log(req.phone);
  console.log(res.address);

  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});