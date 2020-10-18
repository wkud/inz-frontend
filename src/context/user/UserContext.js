import React, { createContext, useState } from 'react';
import inzApi from '../../apis/inzApi';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({
    email: null,
    loading: false,
  });

  const register = (email, password) => {
    setUser({ ...user, loading: true });

    inzApi()
      .post('register', {
        email: email,
        password: password,
      })
      .then((res) => {
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        //TODO catch backend errors
        console.log(err);
      });
  };

  const login = (email, password) => {
    setUser({ ...user, loading: true });

    inzApi()
      .post('login', {
        email: email,
        password: password,
      })
      .then((res) => {
        setUser({ ...user, loading: false, email: email });
        localStorage.setItem('token', res.data.access_token);
        // console.log(localStorage.getItem('token'));
      })
      .catch((err) => {
        //TODO catch backend errors
        console.log(err);
        localStorage.setItem('token', null);
        setUser({ ...user, loading: false, email: null });
      });

    // getIdentity();
  };

  const getIdentity = async () => {
    setUser({ ...user, loading: true });

    const res = await inzApi().get('protected');

    setUser({
      ...user,
      loading: false,
      email: res.data.email,
    });
  };

  return (
    <UserContext.Provider value={[user, setUser, register, login]}>
      {props.children}
    </UserContext.Provider>
  );
};
