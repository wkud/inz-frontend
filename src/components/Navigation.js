import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { GraphIcon } from '@primer/octicons-react';
import NavigationLink from './general/NavigationLink';

const Navigation = () => {
  const { email, logout } = useContext(UserContext);

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>
        <GraphIcon size={24} className='text-primary' />
        <span className='pl-2'>Fund Planner</span>
      </Navbar.Brand>
      {email ? (
        <Nav className='mr-auto'>
          <NavigationLink to='/home'>Home</NavigationLink>
          <NavigationLink to='/expense/list'>Expenses</NavigationLink>
          <NavigationLink to='/category/list'>Categories</NavigationLink>
          <NavigationLink to='/limit/list'>Limits</NavigationLink>
          <NavigationLink to='/analysis'>Analysis</NavigationLink>
        </Nav>
      ) : (
        <Nav className='mr-auto'>
          <NavigationLink to='/home'>Home</NavigationLink>
        </Nav>
      )}
      {email && (
        <>
          <Navbar.Collapse className='justify-content-end mr-2'>
            <Navbar.Text className='text-dark'>
              Signed in as: <a href='#home'>{email}</a>
            </Navbar.Text>
          </Navbar.Collapse>
          <Button variant='outline-dark' onClick={logout} href='#home'>
            Sign out
          </Button>
        </>
      )}
    </Navbar>
  );
};

export default Navigation;
