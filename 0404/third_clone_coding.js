let express = require("express");
let app = express();//express 객체 생성
let path = require("path");//파일이나 디렉토리 목록 담당 라이브러리
let ejs = require("ejs");

console.log(views/board);

app.set('views', path.join(views/board, 'views'));
app.set('view engine', 'ejs');

const {title} = require('process');
const {writer} = require('repl');
app.use(express.urlencoded({extended:false})); // bodyparser 사용

let guestbookList = [
  {"id":1, "title":"제목1", "writer":"작성자1", "contents":"내용1", "wdate":"2021-11-03"},
  {"id":2, "title":"제목2", "writer":"작성자2", "contents":"내용2", "wdate":"2021-11-04"},
  {"id":3, "title":"제목3", "writer":"작성자3", "contents":"내용3", "wdate":"2021-11-05"},
  {"id":4, "title":"제목4", "writer":"작성자4", "contents":"내용4", "wdate":"2021-11-06"},
  {"id":5, "title":"제목5", "writer":"작성자5", "contents":"내용5", "wdate":"2021-11-07"}

];

//use함수는 get과 post 모두에 응한다. 현재 모든 url을 혼자 처리함
app.get("/list", (req,res) => {
  res.render('board/list', {"title":"게시판목록", "guestbookList":guestbookList});
  //efs엔진과 결합하여 render함수 사용
})

app.get("/view/:id", (req,res) => {
  let id = parseInt(req.params.id)-1 // 배열은 0부터 시작인데, id는 1부터 줬으므로
  res.render('board/view', {"title":"게시판상세화면", "guestbook":"geustboolList[id]"});
  //ejs엔진과 결합하여 render함수 사용
})

app.get("/write", (req, res) => {
  res.render('borad/write');
})

app.post("/write", (req, res) => {
  console.log(req.body);
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let wdate = req.body.wdate;
  let id = guestbookList.length+1;

  guestbookList.push( {title:title, contents:contents, writer:writer, wdate:wdate, id:id})
  res.redirect("/list"); // 글작성 후 목록으로 이동
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000');
});