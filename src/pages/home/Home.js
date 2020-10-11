import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Login from '../../components/home/Login';
import Register from '../../components/home/Register';

const Home = () => {
  return (
    <div className='button-font align-self-center'>
      <Tabs defaultActiveKey='home' id='auth-tabs'>
        <Tab eventKey='home' title='Sign in'>
          <div className='auth-section bg-highlight mid-font'>
            <Login />
          </div>
        </Tab>
        <Tab eventKey='profile' title='Sign up'>
          <div className='auth-section bg-highlight mid-font'>
            <Register />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
