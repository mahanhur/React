let http=require("http");
let fs = require("fs"); //파일을 읽기 위함
let url = require("url"); // url분석을 위한 라이브러리

//http://127.0.0.1:6010/add?x=4&y=5
//http://127.0.0.1:6010/sub?x=4&y=5
//http://127.0.0.1:6010/userinfo?userid=test&username=Tom

let server = http.createServer( (request, response) => {
  // console.log(request.url); //전송 url
  console.log(request.method); //전송방식(get방식)

  let rurl = request.url;
  let pathname = url.parse(rurl,true).pathname; //add
  let query = url.parse(rurl,true).query; // {x:4, y:5}
  //string 분석 -> json객체로 전환 (파싱)
  console.log(query);
  console.log(pathname);
  console.log(typeof(query));

  if(pathname == "/add") {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    x= parseInt(query.x);
    y= parseInt(query.y);
    response.end(`${x} + ${y} = ${x + y}`);
  } else if (pathname == "/sub") {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    x= parseInt(query.x);
    y= parseInt(query.y);
    response.end(`${x} - ${y} = ${x - y}`);
  } else if (pathname == "/userinfo") {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    response.end(`userid는 ${query.userid}, username은 ${query.username}입니다.`);
  } else {
    response.writeHead(404, {'Content-Type':'text/html;charset=utf-8'});
    response.end(`<h1>존재하지 않는 url입니다.</h1>`);
  }
})

server.listen(6010, () => {
    console.log("server start http://127.0.0.1:6010");
});
