let express = require("express");
let app = express(); //서버 만들었음
let ejs = require("ejs");
let fs = require("fs");

//내부 변수에 값을 설정
app.set("view engine", ejs);
//미들웨어 사용 설정
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res) => {
  fs.readFile("html/index.html", "utf-8", (error, data) => {
    res.send(data.toString());
  })
})

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});