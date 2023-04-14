//routes폴더에 놓을 것 commonUtil.js

/*
1  2  3  4  5  6  7  8  9  10    0~9     1그룹
11 12 13 14 15 16 17 18 19 20    10~19    2그룹
21 22 23 24 25 26 27             20~26    3그룹

전체 페이지 갯수 확인, 어느 그룹에 속하는지 확인
*/

function getPaging(pg, totalCnt, pageGroupSize=10) {
  pnTotal = totalCnt/10; 
  //한페이지당 데이터가 10개일 때
  //but 문제는 10으로 나누어떨어지지 않을때...
  // so 올림(ceil)으로 처리함
  // ex 15건이다 -> 2페이지가 나와야 함
  pnTotal = Math.ceil(totalCnt/10); //전체 페이지 갯수
  pgGroupStart = parseInt((pg-1)/pageGroupSize) * pageGroupSize+1
  pgGroupEnd = pgGroupStart+9;
  if(pgGroupEnd>pnTotal) {
    pgGroupEnd = pnTotal;
  }

  console.log(pg, pgGroupStart, pgGroupEnd);

  //함수는 반환값이 하나여야 한다. JSON객체로 보내면 여러개를 보낼 수 있음
  return {pnTotal:pnTotal, pnStart:pgGroupStart, pnEnd:pgGroupEnd, pg:pg}
}

//오류 노가다 하기 싫어서 만든 코드
function checkInfo(req, checkInfos) {
  msg = [];
  result = 0;
  resultInfo = {};

  for (info of checkInfos) {
    if (req.body[info.key] === undefined) {
      msg.push(info.key + " is empty");
      result = 1;
      req.body[info.key] = "";
    }

    if (
      info.type === "str" &&
      info.range !== -1 &&
      req.body[info.key].length > info.range
    ) {
      msg.push(info.key + " out of type range");
    }
  }
  resultInfo[info.key] = req.body[info.key];
  resultInfo["result"] = result;
  resultInfo["msg"] = msg;

  return resultInfo;
}


exports.getPaging=getPaging;
exports.checkInfo=checkInfo;

// for(i=1; i<=32; i++) {
//   getPaging(i, 320);
// }
