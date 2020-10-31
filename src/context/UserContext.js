import React, { createContext, useState, useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';
import { CategoryContext } from './CategoryContext';
import inzApi from '../apis/inzApi';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const expense = useContext(ExpenseContext);
  const category = useContext(CategoryContext);

  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
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
        localStorage.setItem('email', email);
        localStorage.setItem('token', res.data.access_token);
        expense.clearFlags();
        category.clearFlags();
      })
      .catch((err) => {
        //TODO catch backend errors
        console.log(err);
        localStorage.setItem('token', '');
        setUser({ ...user, loading: false, email: '' });
      });
  };

  const getIdentity = async () => {
    setUser({ ...user, loading: true });
    console.log('getting identity');

    inzApi()
      .get('identity')
      .then((res) => {
        setUser({
          ...user,
          loading: false,
          email: res.data.email,
        });
      })
      .catch((err) => {
        //TODO catch backend errors
        console.log(err);
      });
  };

  const logout = () => {
    setUser({ ...user, email: null });
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
  };

  return (
    <UserContext.Provider
      value={[user, { register, login, getIdentity, logout }]}
    >
      {props.children}
    </UserContext.Provider>
  );
};
