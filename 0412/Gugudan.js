import React, {useState} from 'react';

function Gugudan(props) {
  const [dan, setDan] = useState("")
  const [result, setResult] = useState("")

  const danChange = (e) => {
    setDan(e.target.value)
  }

  let calc = [];
  const goCalc = () => {
    for(let i=1; i<10; i++) {
      calc.push(`${i} * ${dan} = ${i * dan}`) 
    }    
    setResult(calc);
  }
  return (
    <div>
      <h3>구구단을 외자</h3>
      몇 단 : <input type="number" onChange={danChange}></input>
      <button type="button" onClick={goCalc}>계산</button>
      {result.map( (item, index) => {
                <div key={index}>{item}</div>
        })
      }
    </div>
  );
}

export default Gugudan;