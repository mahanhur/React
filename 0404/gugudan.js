let express = require("express");
let app = express(); //서버 만들었음

//http://127.0.0.1:3000/gugu?dan=4

// app.get("/gugu", (req, res) => {
//   let dan = parseInt(req.query.dan);
//   let fourdan = [];
//   for(i=1;i<10;i++) {
//     fourdan += dan + `*` + i + `=` + dan*i + `<br>`;
//   }
//   res.send(fourdan);
// })
// app.get("/gugu", (req, res) => {
  // res.send("hello"); 이미 데이터 송신 완료이므로 에러발생
//   let dan = parseInt(req.query.dan);
//   let result = '';
//   for(i=1;i<10;i++) {
//     result += `${dan} * ${i} = ${dan*i}<br>`;
//   }
//   res.send(result);
//   // res.send("hello"); 이미 데이터 송신 완료이므로 에러발생
// })
app.get("/gugu/:dan", (req, res) => {
  let dan = parseInt(req.params.dan);
  let result = '';
  for(i=1;i<10;i++) {
    result += `${dan} * ${i} = ${dan*i}<br>`;
  }
  res.send(result);
})

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});