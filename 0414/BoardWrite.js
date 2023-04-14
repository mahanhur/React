import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Route, Routes, Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import { SERVERIP } from '../CommonUtil';

function BoardWrite(props) {
  let history = useNavigate();
  let {id} = useParams(); //보내는 쪽에서 json객체로 보냄

  const [boardTitle, setBoardTitle] = useState("");
  const [boardWriter, setBoardWriter] = useState("");
  const [boardContents, setBoardContents] = useState("");

  useEffect(() => {
    console.log("id", id);
    async function loadData(id) {
      let results = await axios.get(SERVERIP + "/rest_board/view/" + id);
      console.log(results.data);

      setBoardTitle(results.data.boardData.title);
      setBoardWriter(results.data.boardData.writer);
      setBoardContents(results.data.boardData.contents);
    }
    if ( id != undefined) { //write가 아니고 view로 호출할 때
      loadData(id);
    }
    // window.onload 와 같은 역할
    // BoardWrite 컴포넌트가 /board/write 일때는 undefined가 오고
    // /board/view/1 id에는 파라미터값이 저장된다.
  }, []);
  const titleChange = (e) => {
    setBoardTitle(e.target.value);
  }
  const nameChange = (e) => {
    setBoardWriter(e.target.value);
  }
  const contentsChange = (e) => {
    setBoardContents(e.target.value);
  }

//서버로 전송하기
  const postData = () => {
    //데이터를 json형태로 묶어서 보내야한다.
    let data = {title:boardTitle, writer:boardWriter, contents:boardContents};
    axios.post(SERVERIP + "/rest_board/write", data)
    .then( (res) => {
      console.log(res.data);
      history("/board/list"); //redirect사용 못해서 대용으로
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="container">
      <h1>게시판 글쓰기</h1>    
      <table className="table table-hover " style={{marginTop:"30px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
            </colgroup>
        
            <tbody>
              <tr>
                <td>제목</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control"
                        value={boardTitle}  
                        placeholder="제목을 입력하세요" onChange={titleChange}/>
                    </div>
                </td>
              </tr>       
              <tr>
                <td>작성자</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" 
                        value={boardWriter}
                        placeholder="이름을 입력하세요" onChange={nameChange}/>
                    </div>
                </td>
              </tr>          
              <tr>
                <td>내용</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" 
                        value={boardContents}
                        placeholder="내용을 입력하세요" onChange={contentsChange}/>
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

export default BoardWrite;