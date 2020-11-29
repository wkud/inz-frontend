import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      activeStyle={{
        color: '#ffffff',
      }}
      className='nav-font pr-2'
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
