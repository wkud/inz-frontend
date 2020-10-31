import React, { createContext, useState, useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';
import { CategoryContext } from './CategoryContext';
import inzApi from '../apis/inzApi';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const expense = useContext(ExpenseContext);
  const category = useContext(CategoryContext);

  const [state, setState] = useState({
    email: localStorage.getItem('email'),
    loading: false,
    errorMessage: '',
  });

  const resetError = () => setState({ ...state, errorMessage: '' });

  const register = (email, password) => {
    setState({ ...state, loading: true });

    inzApi()
      .post('register', {
        email: email,
        password: password,
      })
      .then((res) => {
        setState({ ...state, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false, errorMessage: err.message });
      });
  };

  const login = (email, password) => {
    setState({ ...state, loading: true });

    inzApi()
      .post('login', {
        email: email,
        password: password,
      })
      .then((res) => {
        resetError();
        setState({ ...state, loading: false, email: email });
        localStorage.setItem('email', email);
        localStorage.setItem('token', res.data.access_token);
        expense.clearFlags();
        category.clearFlags();
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem('token', '');
        setState({
          ...state,
          loading: false,
          email: '',
          errorMessage: err.message,
        });
      });
  };

  const getIdentity = async () => {
    setState({ ...state, loading: true });
    console.log('getting identity');

    inzApi()
      .get('identity')
      .then((res) => {
        setState({
          ...state,
          loading: false,
          email: res.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          loading: false,
          errorMessage: err.message,
        });
      });
  };

  const logout = () => {
    setState({ ...state, email: null });
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
  };

  return (
    <UserContext.Provider
      value={{...state, register, login, getIdentity, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
