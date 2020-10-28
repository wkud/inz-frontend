import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { UserContext } from '../context/user/UserContext';

const Navigation = ({ logo }) => {
  const [user, { setUser }] = useContext(UserContext);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token && !user.email) {
      const storageEmail = localStorage.getItem('email');
      if (storageEmail) setUser({ ...user, email: storageEmail });
      else return false;
    }

    return token && user.email;
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>
        <img src={logo} alt='Logo' className='mid-font-img' />
        <span className='pl-2'>Penny</span>
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#home'>Home</Nav.Link>
        {isUserLoggedIn() && (
          <>
            <Nav.Link href='#expenses'>Expenses</Nav.Link>
            <Nav.Link href='#categories'>Categories</Nav.Link>
            <Nav.Link href='#limits'>Limits</Nav.Link>
          </>
        )}
      </Nav>
      {isUserLoggedIn() && (
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
