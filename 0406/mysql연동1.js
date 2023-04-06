let mysql = require("mysql");
let pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "user01",
  password: "1234",
  database: "mydb",
  port: 3306
});

//db와 연결을 한다
pool.getConnection((err, connection) => {
  //db와 연결을 성공하면 매개변수로 전달된 함수가 호출된다
  //err - db와 연결 실패시
  if (err) {
    console.log(err);
    return;
  }
  //연결 성공시 연결객체 connection을 전달한다
  //연결 객체
  console.log("connection success");
  sql = `INSERT INTO tb_board(title, writer, contents, wdate)
	VALUES(?,?,?,NOW())`;
  // 성공시 rows안에 json형태로 받아옴
  let params = ['제목2', '임꺽정', '내용2'];
  connection.query(sql, params, (err, rows) => {
    if (err) {
      console.log("err");
    } else {
      console.log(rows);
      connection.release(); //연결해제
    }
  });
});
console.log("end");