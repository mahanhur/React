import React, { useState } from 'react';

function Fortest1(props) {
  const [fruitList] = useState(["사과", "배", "포도", "수박", "머루"]);
  const goSelect = (index) => {
    alert(fruitList[index]);
  }
  return (
    <div>
      <ul>
      {
        fruitList.map( (item, index) => {
          return(
            <li>
              <a href="#none" onClick={(e) => {goSelect(index)}}>{item}</a>
            {/* onclick안에 함수(람다)로 정의하지 않으면
            goselect가 바로 표출됨(클릭 안해도) */}
            </li>
          )
        })
      }
      </ul>
    </div>
  );
}

export default Fortest1;