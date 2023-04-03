let express = require("express");
let app = express(); //서버 만들었음

app.use("/test", (req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Test <h1/>")
});

app.get("/get", (req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>GET<h1/>")
});

// app.get("/userinfo", (req, res) => {
//   let userinfo={name:"TOM", "phone":"010-0000-0000"};
//   res.send(userinfo); // send함수를 이용하여 JSON 데이터 송신
// });

app.get("/userinfo2", (req, res) => {
  
  let userinfo2={name:req.query.name, phone:req.query.phone};
  res.send(userinfo2); // send함수를 이용하여 JSON 데이터 송신
});  // 이런 형식은 query로 받음

//userinfo3/Brown/user01
app.get("/userinfo3/:username/:userid", (req, res) => {
  // 이런 형식은 params로 받음
  let userinfo3={username:req.params.username, userid:req.params.userid};
  res.send(userinfo3); // send함수를 이용하여 JSON 데이터 송신
});

app.post("/post", (req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>POST<h1/>")
});

//다른 url없을 때 처리하는 방식(순서상 가장 아래에 있어야 함)
//가장 위에 있으면 기본값으로 세팅되어 다른 url이 있어도 이것만 나옴
app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express <h1/>")
});



app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});