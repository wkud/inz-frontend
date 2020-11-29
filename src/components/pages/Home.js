import React, { useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Login from '../../components/home/Login';
import Register from '../../components/home/Register';
import { UserContext } from '../../context/UserContext';

const Home = () => {
  const user = useContext(UserContext);

  return (
    <>
      <div className='lead'>
        {user.email ? (
          <>
            It's empty here. <br />
            Start by adding your expenses, creating your categories and plan by
            setting a limit.
          </>
        ) : (
          <>
            <h3 className='lead-font'>Welcome to the Fund Planner!</h3>
            <p>Here you can plan and analyze your expenditure.</p>
            <p className='mb-0 mt-3'>
              Sign in to continue <br />
              ...or sign up if you don't have an account yet.
            </p>
          </>
        )}
      </div>
      {!user.email && (
        <div className='button-font align-self-center'>
          <Tabs
            defaultActiveKey='login'
            id='auth-tabs'
            onSelect={() => user.clearFlags()}
          >
            <Tab eventKey='login' title='Sign in'>
              <div className='auth-section border border-primary mid-font px-2'>
                <Login />
              </div>
            </Tab>
            <Tab eventKey='register' title='Sign up'>
              <div className='auth-section border border-primary mid-font px-2'>
                <Register />
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Home;
