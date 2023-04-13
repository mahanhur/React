import logo from './logo.svg';
import './App.css';
import { Route, Routes, Outlet, Link } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './component/Home';
import About from './component/About';
import Fortest1 from './component/Fortest1';
import Fortest2 from './component/Fortest2';
import Gugudan2 from './component/Gugudan2';

function App() {
  return (
    <div className="App">
      <h1>라우터 연습</h1>
      {
        /*
        path = 가상url
        element = 컴포넌트
        */
      }
      <Routes>
        <Route path="/" element={<Layout/>} >
{/* 전체적인 라우터의 골격은 Layout 컴포넌트에 넣는다 */}
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="fortest1" element={<Fortest1/>}/>
        <Route path="gugudan2" element={<Gugudan2/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
