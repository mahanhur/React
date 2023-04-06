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

  /////////////////
  //insert 후 select 실행해야하는데 insert가 예상보다 시간이 오래걸리면
  //비동기 특성상 insert전에 select가 먼저실행될 수 있음,
  // ==> insert문을 프라미스 사용, then에 select를 넣음
  new Promise((resolve, reject) => {
      sql = `INSERT INTO tb_board(title, writer, contents, wdate)
    VALUES(?,?,?,NOW())`;
      let params = ['제목4', '장길산2', '내용4'];
      connection.query(sql, params, (err, rows) => {
        if (err) {
          reject("db오류"); //catch구문으로 이동
        } else {
          resolve("success"); // then구문으로 이동
        }
      });
    })
    .then((result) => {
      sql = "select * from tb_board";
      connection.query(sql, (err, rows) => {
        if (err) {
          console.log("err");
        } else {
          console.log(rows);
        }
      });
    })
    .catch((error) => {
      console.log(error)
    });
});
// 성공시 rows안에 json형태로 받아옴
console.log("end");