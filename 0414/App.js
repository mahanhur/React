import logo from './logo.svg';
import './App.css';
import { Route, Routes, Outlet, Link } from 'react-router-dom';
import Layout from './layout/Layout.js';
import Home from './component/Home.js';
import BoardList from './board/BoardList.js'
import BoardWrite from './board/BoardWrite.js'
import ScoreList from './board/ScoreList';
import ScoreWrite from './board/ScoreWrite';
import HeroList from './component/hero/HeroList.js'
import HeroWrite from './component/hero/HeroWrite.js'

function App() {
  return (
    <div className="App">
      <h1>MYHOME</h1>

      <Routes>
        <Route path="/" element={<Layout/>} >
        <Route index element={<Home/>}/>
        <Route path="/board/list" element={<BoardList/>}></Route>
        <Route path="/score/list" element={<ScoreList/>}></Route>
        <Route path="/board/write" element={<BoardWrite/>}></Route>
        <Route path="/score/write" element={<ScoreWrite/>}></Route>
        <Route path="/board/view/:id" element={<BoardWrite/>}></Route>
        <Route path="/score/view/:id" element={<ScoreWrite/>}></Route>
        {/* <Route path="/score/view/:id" element={<ScoreWrite/>}></Route> */}
        <Route path="/hero/list" element={<HeroList/>}></Route>
        <Route path="/hero/write" element={<HeroWrite/>}></Route>
        <Route path="/hero/view/:id" element={<HeroWrite/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
