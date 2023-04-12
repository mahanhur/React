import React, { useState } from 'react';

function Iftest1(props) {
  const [flag, setFlag] = useState(true);

  const changeFlag = () => {
    setFlag( !flag );
  }
  return (
    <div>
      <h1>if테스트 {flag}</h1>
      <button type="button" onClick={changeFlag}>토글</button><br/>
      {flag? <h3>이 문구가 보입니다.</h3> : <p>disabled</p>}
    </div>
  );
}

export default Iftest1;