let express = require("express");
let fs = require("fs");
let ejs = require("ejs");
let app = express(); //서버 만들었음

app.use(express.urlencoded({extended:false}));

app.get("/guguform", (req, res) => {
  fs.readFile("./html/guguform.html", "utf-8", (err, data) => {
    res.writeHead(200, {"Content-type":"text/html"});
    res.end(ejs.render(data));
  });
});

app.get("/gugu", (req, res) => {
  let dan = parseInt(req.query.dan)
  let operator = req.query.operator
  let result = '';
  if(operator == "1") {
    for(i=1;i<10;i++) {
      result += `${dan} * ${i} = ${dan * i}<br/>`
    }
    res.send(`<h1>구구단 ${dan}단</h1> ${result}`);
  }
})

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});