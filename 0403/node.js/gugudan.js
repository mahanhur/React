let express = require("express");
let app = express(); //서버 만들었음

// /add?x=45&y=7
// /add/45/7

app.get("/gugu", (req, res) => {
  let dan = parseInt(req.query.dan);
  let fourdan = [];
  for(i=1;i<10;i++) {
    fourdan.push(dan * i);
  }
  res.send(fourdan);
})

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});