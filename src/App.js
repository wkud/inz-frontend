import React from 'react';
import { UserProvider } from './context/user/UserContext';
import Credits from './components/Credits';
import MyNavbar from './components/MyNavbar';
import Home from './components/pages/Home.js';
import logo from './static/penny.png';
import 'bootstrap/dist/css/bootstrap.css';
import './style/App.css';

function App() {
  return (
    <UserProvider>
      <div className='parent bg-light d-flex flex-column justify-content-between'>
        <MyNavbar logo={logo} />
        <Home />
        <Credits />
      </div>
    </UserProvider>
  );
}

export default App;
