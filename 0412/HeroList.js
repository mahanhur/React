//백앤드서버로부터 데이터 가져오는 exercise
// axios라는 모듈 필요함

import React, {useState, useEffect} from 'react';
import axios from 'axios';

function HeroList(props) {
  const [heroList, setHeroList] = useState([]);
  const [loading, setLoading] = useState(false);//데이터를 수신하면 true로 바뀌도록
//useState함수가 값을 초기화해주면 해당 값을 저장할 변수와 해당 값을 변경하는 함수를
//반환함. [] -> 배열을 저장할 변수반환, 배열값을 변환할 함수 주소

  //첫번째 매개변수 - mount될 때, update될 때, unmount될 때 호출된다.
  //[] - 변수: 변수들이 바뀔 때 호출된다.
  useEffect( () => {
    // console.log("나 호출된다.");
    // setHeroList(heroList.concat([
    //   {id:1, name:"이순신", desc:"임란승리"},
    //   {id:2, name:"아이언맨", desc:"돈이많음"},
    //   {id:3, name:"캡아", desc:"방패가 단단함"}
    // ]))
    //promise기반 컴포넌트라서
    axios.get("http://localhost:9090/hero/list")
    .then( (res) => {
      console.log(res);
      setHeroList(res.data);
      setLoading(true);
    })
    .catch( (res, status, error) => {
      console.log(status);
    })
  }, []);

  return (
    <div>
    <table> {
      loading == true?
      heroList.map( (item, index) => {
        return (
          <tr>
            <td>{item.id}</td>
            <td>{item.hero_name}</td>
            <td>{item.hero_desc}</td>
          </tr>
        )
      }):""
      }
    </table>
    </div>
  )
}

export default HeroList;