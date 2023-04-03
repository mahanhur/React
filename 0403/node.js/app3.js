let express = require("express");
let app = express(); //서버 만들었음

//post의 경우 bodyparser라는 모듈을 설치해야함
//express는 자체적으로 해당 모듈 가지고 있음(버전마다 다름)
// express에서 이용하는 코드는 다음과 같음
app.use(express.urlencoded({extended:false}));
//이렇게 중간에서 거쳐가는 작업을 미들웨어 라고 함
//app객체 생성 후 다른 url처리 전에 한 번만 호출하면 됨.

app.post("/add", (req,res) => {
  let x = req.body.x;
  let y = req.body.y;
  let z = parseInt(x) + parseInt(y);

  res.send({x:x, y:y, z:z});

})

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});