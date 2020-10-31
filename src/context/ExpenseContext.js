import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

export const ExpenseContext = createContext();

export const ExpenseProvider = (props) => {
  const [state, setState] = useState({
    list: [],
    loading: false,
    errorMessage: '',
  });

  const sortExpenseListByDate = (list) =>
    list.sort((e1, e2) => new Date(e2.date) - new Date(e1.date));

  const resetError = () => setState({ ...state, errorMessage: '' });

  const getAll = () => {
    if (state.loading || state.errorMessage) return;

    setState({ ...state, loading: true });

    inzApi()
      .get('expense')
      .then((res) => {
        setState({
          ...state,
          loading: false,
          list: sortExpenseListByDate(res.data.list),
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false, errorMessage: err.message });
      });
    return state.list;
  };

  const create = (newExpenseData) => {
    setState({ ...state, loading: true });

    inzApi()
      .post('expense', newExpenseData)
      .then((res) => {
        console.log(res.data);
        setState({
          ...state,
          loading: false,
          list: sortExpenseListByDate([
            ...state.list,
            { ...newExpenseData, id: res.data.id },
          ]),
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false, errorMessage: err.message });
      });
  };

  return (
    <ExpenseContext.Provider value={{ ...state, resetError, getAll, create }}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
