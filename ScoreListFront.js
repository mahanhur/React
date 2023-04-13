import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Route, Routes, Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import { SERVERIP } from '../CommonUtil';

function ScoreList(props) {
  const [scoreList, setScoreList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    async function loadData() {
    const url = SERVERIP+"/score/list"
    await axios.get(url)
    .then( (res) => {
      setScoreList(res.data);
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
       <table className="table table-hover ">
            <thead className="table-secondary">
              <tr>
                <th>id</th>
                <th>이름</th>
                <th>국어</th>
                <th>영어</th>
                <th>수학</th>
              </tr>
            </thead>
            <tbody>
                {
                  loading==true?
                  scoreList.map( (item, index) => {
                    return(
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td><Link to={"/score/view/"+item.id}>{item.score_name}</Link></td>
                      <td>{item.score_kor}</td>
                      <td>{item.score_eng}</td>
                      <td>{item.score_math}</td>
                    </tr>
                    )
                  })
                  :""
                }         
            </tbody>
          </table>
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link className="btn btn-secondary" to="/score/write">추가하기</Link>
          </div>
    </div>
  );
}

export default ScoreList;