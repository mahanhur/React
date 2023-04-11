import React, { useState } from 'react';

//함수의 경우에는 생성자가 아니라 매개변수를 통한다
// 부모가 자식한테 값을 보낼 때 매개변수를 통해서 보낸다.
// props -> json 객체
function Appclass2(props) {
  //useState(변수의 초기값)
  const [name, setName] = useState("홍동길");
  const [age, setAge] = useState(32);
  const {title, address} = props;
  return (
    <div>
      <h1>{title}</h1>
      <h3>이름 : {name}</h3>
      <h3>나이 : {age}</h3>
      <h3>주소 : {address}</h3>
    </div>
  );
}
//함수의 경우에는 생성자가 아니라 매개변수를 통한다
// 부모가 자식한테 값을 보낼 때 매개변수를 통해서 보낸다.
// props -> json 객체

export default Appclass2;