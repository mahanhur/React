let express = require("express");
let app = express(); //서버 만들었음
let fs = require("fs");
let ejs = require("ejs");


//ejs엔진은 views폴더 아래서 파일을 검색한다
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));

let boardList = [
  {id:1, title:"제목1", writer:"작성자1", wdate:"2023-04-04"},
  {id:2, title:"제목2", writer:"작성자2", wdate:"2023-04-05"},
  {id:3, title:"제목3", writer:"작성자3", wdate:"2023-04-06"},
  {id:4, title:"제목4", writer:"작성자4", wdate:"2023-04-07"},
  {id:5, title:"제목5", writer:"작성자5", wdate:"2023-04-08"},
  {id:6, title:"제목6", writer:"작성자6", wdate:"2023-04-09"},
]

app.use("/board/list", (req,res) => {
  res.render("board/board_list.ejs", {boardList:boardList});
})
app.use("/board/view/:id", (req,res) => {
  let id = req.params.id;
  let item = boardList.filter(x=>x.id==id);
  res.render("board/board_view.ejs", {item:item[0]});
})
//페이지만 이동한다 board_write.ejs로 이동만 한다
app.use("/board/write", (req,res) => {
  res.render("board/board_write.ejs");
})
//저장하기
app.use("/board/save", (req,res) => {
  let title=req.body.title;
  let contents=req.body.contents;
  let writer=req.body.writer;
  let wdate=req.body.wdate;
  let id = boardList.length+1;

  boardList.push({id:id, title:title, contents:contents, writer:writer, wdate:wdate});
  res.redirect("/board/list"); //강제이동
})

app.use((req, res) => {
  res.writeHead(200, {"Content-type":"text/html"});
  res.end("<h1>Express Base<h1/>")
});

app.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});