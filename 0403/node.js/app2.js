let express = require("express");
let app = express(); //서버 만들었음

// /add?x=45&y=7
// /add/45/7

app.get("/add", (req, res) => {
  let x = parseInt(req.query.x);
  let y = parseInt(req.query.y);
  let sum = {"sum": x + y};
  res.send(sum);
})

app.get("/add2/:x/:y", (req, res) => {
  let x = parseInt(req.params.x);
  let y = parseInt(req.params.y);
  let sum = {"sum": x + y};
  res.send(sum);
})

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});