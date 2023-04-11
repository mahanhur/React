import logo from './logo.svg';
import './App.css';
import Mycomponent from './component/mycomponent1';
import Appclass from './component/Appclass';
import Appclass2 from './component/Appclass2';
import Inputtest from './component/Inputtest';

//https://reactjs.org"
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Mycomponent/>
      {/* <Appclass address="서울시 성동구" title="자기소개"/> */}
      {/* <Appclass2 address="서울시 영등포구" title="자소기개"/> */}
      <Inputtest/>

      </header>
    </div>
  );
}

export default App;
