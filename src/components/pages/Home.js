import React, { useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Login from '../../components/home/Login';
import Register from '../../components/home/Register';
import { UserContext } from '../../context/user/UserContext';

const Home = () => {
  const [user,] = useContext(UserContext);

  return (
    <div className='button-font align-self-center'>
      <h3>{user.id}</h3>
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
