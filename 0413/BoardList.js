import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Route, Routes, Outlet, Link } from 'react-router-dom';
import { SERVERIP } from '../CommonUtil';


function BoardList(props) {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    async function loadData() {
    const url = SERVERIP+"/hero/list"
    await axios.get(url)
    .then( (res) => {
      setBoardList(res.data);
      setLoading(true);
      console.log(res.data);
    })
    .catch( (error) => {
      console.log(error);
    })
  }
  loadData();
  }, []);

  return (
    <div>
          <div class="container" style={{marginTop:"80px"}}>
          <h2>게시판 목록</h2>
              <div className="input-group mb-3" style={{marginTop:"20px"}}>
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                선택하세요
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">제목</a></li>
              <li><a className="dropdown-item" href="#">내용</a></li>
              <li><a className="dropdown-item" href="#">제목+내용</a></li>
            </ul>
            <input type="text" className="form-control" placeholder="Search"/>
            <button className="btn btn-secondary" type="submit">Go</button>
          </div>

        <table className="table table-hover ">
            <thead className="table-secondary">
              <tr>
                <th>Num</th>
                <th>이름</th>
                <th>업적</th>
              </tr>
            </thead>
            <tbody>
                {
                  loading==true?
                  boardList.map( (item, index) => {
                    return(
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td><Link to={"/board/view/"+item.id}>{item.hero_name}</Link></td>
                      <td>{item.hero_desc}</td>
                    </tr>
                    )
                  })
                  :""
                }         
            </tbody>
          </table>

 
          <ul className="pagination  justify-content-center">
            <li className="page-item disabled"><a className="page-link" href="#">first</a></li>
            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">4</a></li>
            <li className="page-item"><a className="page-link" href="#">5</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
            <li className="page-item"><a className="page-link" href="#">last</a></li>
          </ul>
       
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link className="btn btn-secondary" to="/board/write">글쓰기</Link>
          </div>
        </div>
    </div>
  );
}

export default BoardList;