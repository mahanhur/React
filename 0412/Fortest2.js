import React, { useState } from 'react';

function Fortest1(props) {
  const [fruitList, setFruitList] = useState(["사과", "배", "포도", "수박", "머루"]);
  const [fruit, setFruit] = useState("");

  //input 태그에서 값 입력하면 fruit변수에 값을 저장한다
  const onChange = (e) => {
    setFruit(e.target.value)
  } 
  //추가 버튼을 누르면 fruit변수의 값을 fruitList에 추가
  const goAppend = () => {
    //원 배열에 push함수(데이터추가) 사용 못함,
    // 배열 자체를 새로 만들어서 복제한 후 추가해야함
    //push - 원래 배열메모리에 추가
    //concnat - 새로운 배열을 만들어서 기존배열 복사하고 하나 추가
    setFruitList( fruitList.concat(fruit));
    setFruit(""); //input태그 공백 변경
  }
  const goSelect = (index) => {
    alert(fruitList[index] + `입니다`);
  }
  return (
    <div>
      <input type="text" onChange={onChange} value={fruit} />
      <button type="button" onClick={goAppend}>추가</button><br/>
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