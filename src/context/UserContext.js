import React, { createContext, useState, useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';
import { CategoryContext } from './CategoryContext';
import { LimitContext } from './LimitContext';
import inzApi from '../apis/inzApi';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const expense = useContext(ExpenseContext);
  const category = useContext(CategoryContext);
  const limit = useContext(LimitContext);

  const [state, setState] = useState({
    // email: localStorage.getItem('email'),
    email: '',
    loading: false,
    errorMessage: '',
    successMessage: '',
  });

  const clearFlags = () =>
    setState({ ...state, errorMessage: '', successMessage: '' });

  const register = (email, password, confirmPassword) => {
    setState({ ...state, loading: true });

    if (password !== confirmPassword) {
      setState({
        ...state,
        errorMessage: 'Entered passwords must be the same.',
        successMessage: '',
      });
      return;
    }

    inzApi()
      .post('register', {
        email: email,
        password: password,
      })
      .then((res) => {
        setState({
          ...state,
          loading: false,
          errorMessage: '',
          successMessage: 'Account created. You can sign in now.',
        });
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          loading: false,
          errorMessage: 'Cannot sign up due to an error.',
          successMessage: '',
        });
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
        setState({
          ...state,
          loading: false,
          email: email,
          errorMessage: '',
          successMessage:
            'Credentials accepted. You are about to be redirected :)', //TODO: show this message in react-alert
        });
        // localStorage.setItem('email', email);
        localStorage.setItem('token', res.data.access_token);
        expense.clearFlags();
        category.clearFlags();
        limit.clearFlags();
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem('token', '');
        setState({
          ...state,
          loading: false,
          email: '',
          errorMessage: 'Cannot sign in due to an error.',
          successMessage: '',
        });
      });
  };

  const logout = () => {
    setState({ ...state, email: null, errorMessage: '', successMessage: '' });
    // localStorage.setItem('email', '');
    localStorage.setItem('token', '');
  };

  return (
    <UserContext.Provider
      value={{ ...state, register, login, logout, clearFlags }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
