import React, { useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Login from '../../components/home/Login';
import Register from '../../components/home/Register';
import {UserContext} from '../../context/user/UserContext';

const Home = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      <p className='lead'>
        Welcome to the Penny.
        <br />
        Sign in to continue or sign up if you don't have an account yet.
      </p>
      {user.loading && <p>loading...</p>}
      <div className='button-font align-self-center'>
        <Tabs defaultActiveKey='home' id='auth-tabs'>
          <Tab eventKey='home' title='Sign in'>
            <div className='auth-section bg-highlight mid-font px-2'>
              <Login />
            </div>
          </Tab>
          <Tab eventKey='profile' title='Sign up'>
            <div className='auth-section bg-highlight mid-font px-2'>
              <Register />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Home;
