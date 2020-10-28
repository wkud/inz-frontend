import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { UserContext } from '../context/user/UserContext';

const Navigation = ({ logo }) => {
  const [user] = useContext(UserContext);

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>
        <img src={logo} alt='Logo' className='mid-font-img' />
        <span className='pl-2'>Penny</span>
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#home'>Home</Nav.Link>
        {user.email && (
          <>
            <Nav.Link href='#expenses'>Expenses</Nav.Link>
            <Nav.Link href='#categories'>Categories</Nav.Link>
            <Nav.Link href='#limits'>Limits</Nav.Link>
          </>
        )}
      </Nav>
      {user.email && (
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            Signed in as: <a href='#home'>{user.email}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Navigation;
