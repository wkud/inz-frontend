import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { UserContext } from '../context/user/UserContext';

const MyNavbar = ({ logo }) => {
  const [user] = useContext(UserContext);

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#'>
        <img src={logo} alt='Logo' className='mid-font-img' />
        <span className='pl-2'>Penny</span>
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#'>Home</Nav.Link>
        <Nav.Link href='#features'>Features</Nav.Link>
        <Nav.Link href='#pricing'>Pricing</Nav.Link>
      </Nav>
      {user.email && (
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            Signed in as: <a href='#login'>{user.email}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default MyNavbar;
