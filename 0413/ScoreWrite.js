import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Route, Routes, Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import { SERVERIP } from '../CommonUtil';

function ScoreWrite(props) {
  let history = useNavigate();
  let {id} = useParams(); //보내는 쪽에서 json객체로 보냄

  const [scoreName, setScoreName] = useState("");
  const [scoreKor, setScoreKor] = useState("");
  const [scoreEng, setScoreEng] = useState("");
  const [scoreMath, setScoreMath] = useState("");

  useEffect(() => {
    console.log("id", id);
    async function loadData(id) {
      let results = await axios.get(SERVERIP + "/score/view/" + id);
      console.log(results.data.score.score_name);
      console.log(results.data.score.score_kor);

      setScoreName(results.data.score.score_name);
      setScoreKor(results.data.score.score_kor);
      setScoreEng(results.data.score.score_eng);
      setScoreMath(results.data.score.score_math);
    }
    if ( id != undefined) { //write가 아니고 view로 호출할 때
      loadData(id);
    }
    // window.onload 와 같은 역할
    // BoardWrite 컴포넌트가 /board/write 일때는 undefined가 오고
    // /board/view/1 id에는 파라미터값이 저장된다.
  }, []);
  const nameChange = (e) => {
    setScoreName(e.target.value);
  }
  const korChange = (e) => {
    setScoreKor(e.target.value);
  }
  const engChange = (e) => {
    setScoreEng(e.target.value);
  }
  const mathChange = (e) => {
    setScoreMath(e.target.value);
  }
//서버로 전송하기
  const postData = () => {
    //데이터를 json형태로 묶어서 보내야한다.
    let data = {score_name:scoreName, score_kor:scoreKor, score_eng:scoreEng, score_math:scoreMath};
    axios.post(SERVERIP + "/score/write", data)
    .then( (res) => {
      console.log(res.data);
      history("/score/list"); //redirect사용 못해서 대용으로
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="container">
      <h1>점수 추가하기</h1>    
      <table className="table table-hover " style={{marginTop:"30px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
            </colgroup>
        
            <tbody>
              <tr>
                <td>이름</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control"
                        value={scoreName}  
                        placeholder="제목을 입력하세요" onChange={nameChange}/>
                    </div>
                </td>
              </tr>       
              <tr>
                <td>국어</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="number" className="form-control" 
                        value={scoreKor}
                        placeholder="점수을 입력하세요" onChange={korChange}/>
                    </div>
                </td>
              </tr>          
                       
              <tr>
                <td>영어</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="number" className="form-control" 
                        value={scoreEng}
                        placeholder="점수을 입력하세요" onChange={engChange}/>
                    </div>
                </td>
              </tr>          
                       
              <tr>
                <td>수학</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="number" className="form-control" 
                        value={scoreMath}
                        placeholder="점수을 입력하세요" onChange={mathChange}/>
                    </div>
                </td>
              </tr>          
                       
            </tbody>
          </table>
       
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link className="btn btn-secondary" onClick={postData}>등록</Link>&nbsp;&nbsp;
            <Link className="btn btn-secondary">취소</Link>
          </div> 
    </div>
  );
}

export default ScoreWrite;