import React, { useState } from 'react';

function Inputtest(props) {
  const [name, setName] = useState("장산길");
  const [age, setAge] = useState("32");
  const [email, setEmail] = useState("never.com");
  
  //람다함수이용! - 일반함수를 사용할경우 생성자에서 데이터 바인딩을 별도로 해줘야함
  const nameChange = (e) => {
    //인자가 발생한 이벤트에 대한 모든 정보를 가지고 있음
    // console.log(e.target.value); // 키를 누를 모든 값이 저장되어 있다.
    setName(e.target.value); //name변수의 값이 바뀐다.
  }
  const ageChange = (e) => {
    setAge(e.target.value); //name변수의 값이 바뀐다.
  }
  const emailChange = (e) => {
    setEmail(e.target.value); //name변수의 값이 바뀐다.
  }

  let mystyle= {
    color:"white", fontSize:25, backgroundColor:"black", padding:"20px 10px 10px 10px"
  }
  return (
    <div>
      이름 : <input type="text" onChange={nameChange} style={mystyle}/><br/><br/>
      나이 : <input type="text" onChange={ageChange} style={mystyle} /><br/><br/>
      이메일 : <input type="text" onChange={emailChange} style={mystyle} /><br/>
      <p>{name}<br/> {age}<br/> {email}</p>
    </div>
  );
}

export default Inputtest;