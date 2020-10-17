import React, { createContext, useState } from 'react';
import inzApi from '../../apis/inzApi';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({
    email: 'bob@nice.org',
    id: -1,
    loading: false,
  });

  const register = async (email, password, confirmPasword) => {
    setUser({ ...user, loading: true });

    const res = await inzApi().post('register', {
      email: 'name3@domain.com', //todo replace hardcode with actual data
      password: 'pass',
    });

    setUser({ ...user, loading: false, id: res.data.id });
  };

  const login = async (email, password) => {
    setUser({ ...user, loading: true });

    const res = await inzApi().post('login', {
      email: 'name3@domain.com', //todo replace hardcode with actual data
      password: 'pass',
    });

    setUser({ ...user, loading: false });
    localStorage.setItem('token', res.data.access_token);

    getIdentity();
  };

  const getIdentity = async () => {
    setUser({ ...user, loading: true });

    const res = await inzApi().get('protected');

    setUser({
      ...user,
      loading: false,
      id: res.data.id,
      email: res.data.email,
    });
  };

  return (
    <UserContext.Provider value={[user, setUser, register, login]}>
      {props.children}
    </UserContext.Provider>
  );
};
