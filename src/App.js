import React from 'react';
import { Navbar } from 'react-bootstrap';
import Credits from './components/home/credits';
import './style/App.css';

function App() {
  return (
    <div className='parent d-flex flex-column justify-content-between'>
      <Navbar className='d-flex flex-row justify-content-between align-items-center'>
        <div className='big-font pr-2'>Welcome!{' '}</div>
        <div className='pb-1'>Sign in to continue or sign up if you didn't already.</div>
      </Navbar>
      <div className='d-flex flex-row justify-content-around'>
        <div className='big-font mid-element bg-highlight d-flex flex-column justify-content-around'>
          <div>Login</div>
          <div>email</div>
          <div>password</div>
        </div>
        <div className='big-font mid-element bg-highlight d-flex flex-column justify-content-around'>
          <div>Register</div>
          <div>email</div>
          <div>password</div>
          <div>confirm password</div>
        </div>
      </div>
      <div className=''>
        <Credits />
      </div>
    </div>
  );
}

export default App;
