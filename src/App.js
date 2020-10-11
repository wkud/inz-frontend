import React from 'react';
import Credits from './components/Credits';
import MyNavbar from './components/MyNavbar';
import Home from './pages/home/Home.js';
import logo from './static/penny.png';
import 'bootstrap/dist/css/bootstrap.css';
import './style/App.css';

function App() {
  return (
      <div className='parent bg-light d-flex flex-column justify-content-between'>
        <MyNavbar logo={logo}/>
        <Home />
        <Credits />
      </div>
  );
}

export default App;
