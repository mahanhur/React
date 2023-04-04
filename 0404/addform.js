let express = require("express");
let fs = require("fs");
let ejs = require("ejs");
let app = express(); //서버 만들었음

app.use(express.urlencoded({extenede:false}));

app.get("/addform", (req, res) => {
  fs.readFile("./html/addform.html", "utf-8", (err, data) => {
    res.writeHead(200, {"Content-type":"text/html"});
    res.end(ejs.render(data));
  });
});

app.get("/add", (req, res) => {
  let x = parseInt(req.query.x); 
  let y = parseInt(req.query.y);
  let sum = x + y;
  res.send(`${x} + ${y} = ${sum}`);
});

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});