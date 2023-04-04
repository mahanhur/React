let express = require("express");
let fs = require("fs");
let ejs = require("ejs");
let app = express(); //서버 만들었음

app.use(express.urlencoded({extenede:false}));

app.get("/third_assignment", (req, res) => {
  fs.readFile("./html/third_assignment.html", "utf-8", (err, data) => {
    res.writeHead(200, {"Content-type":"text/html"});
    res.end(ejs.render(data));
  });
});

app.get("/result", (req, res) => {
  let name = req.query.name;
  let kor = parseInt(req.query.kor); 
  let eng = parseInt(req.query.eng);
  let mat = parseInt(req.query.math);
  let sum = kor + eng + mat;
  let avg = sum/3;

  res.send(`${name}님의 총점은 ${sum}, 평균은 ${avg}입니다.`);

});

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});