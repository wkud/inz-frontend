import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { GraphIcon } from '@primer/octicons-react';
const Navigation = ({ logo }) => {
  const { email, logout } = useContext(UserContext);

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>
        <GraphIcon size={24} className='text-primary'/>
        <span className='pl-2'>Fund Planner</span>
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#home'>Home</Nav.Link>
        {email && (
          <>
            <Nav.Link href='#expense/list'>Expenses</Nav.Link>
            <Nav.Link href='#category/list'>Categories</Nav.Link>
            <Nav.Link href='#limit/list'>Limits</Nav.Link>
            <Nav.Link href='#analysis'>Analysis</Nav.Link>
          </>
        )}
      </Nav>
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
