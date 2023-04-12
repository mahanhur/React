import React, {useState} from 'react';

function Gugudan(props) {
  const [dan, setDan] = useState("");
  const [iList] = useState([1,2,3,4,5,6,7,8,9]);
  const [show, setShow] = useState(false);

  const danChange = (e) => {
    setShow(false)//화면출력 막음
    setDan(e.target.value) //단값 넣고
  }

  const goComfirm = () => {
    setShow(true); //확인버튼 누르면 화면 출력되도록
  }
  
  return (
    <div>
      <h3>구구단을 외자</h3>
      몇 단 : <input type="number" onChange={danChange}></input>
      <button type="button" onClick={goComfirm}>계산</button>
      {
        show?
        iList.map( (item, index) => {
          return(
            <li key={index}>
              {dan} X {item} = {dan*item}
            </li>
          )
        }) : ""
      }
    </div>
  );
}

export default Gugudan;