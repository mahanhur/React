import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function Layout(props) {
  return (
    <div>
      <nav>{/*메뉴*/}
      </nav>  
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Fortest1">Fortest</Link></li>
          <li><Link to="/Gugudan2">Gugudan2</Link></li>
        </ul>
      <hr/>
      <Outlet/> {/*각 컴포넌트의 내용이 뿌려질 위치 */}
    </div>
  );
}

export default Layout;