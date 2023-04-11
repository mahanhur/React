import React, { useState } from 'react';

function Ass1(props) {
  const [name, setName] = useState("");
  const [kor, setKor] = useState("");
  const [eng, setEng] = useState("");
  const [math, setMath] = useState("");
  const [result, setResult] = useState("");
  
  const korChange = (e) => {
    setKor(e.target.value); //name변수의 값이 바뀐다.
  }
  const engChange = (e) => {
    setEng(e.target.value); //name변수의 값이 바뀐다.
  }
  const mathChange = (e) => {
    setMath(e.target.value); //name변수의 값이 바뀐다.
  }
  const nameChange = (e) => {
    setName(e.target.value); //name변수의 값이 바뀐다.
  }
  
  let mystyle= {
    color:"black", fontSize:25, backgroundColor:"white", padding:"20px 10px 10px 10px"
  }
  
  function sum() {
    let sum = parseInt(kor) + parseInt(eng) + parseInt(math);
    let avg = sum/3;

    setResult(`${name}의 총점은 ${sum}, 평균은 ${avg}입니다.`)
  }

  return (
    <div>
      이름 : <input type="text" onChange={nameChange} style={mystyle}/><br/><br/>
      국어 : <input type="text" onChange={korChange} style={mystyle} /><br/>
      영어 : <input type="text" onChange={engChange} style={mystyle} /><br/>
      수학 : <input type="text" onChange={mathChange} style={mystyle} /><br/>

      <button type="button" onClick={sum}>결과확인</button>
      <div>{result}</div>      
    </div>
  );
}

export default Ass1;