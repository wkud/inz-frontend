import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

export const ExpenseContext = createContext();

export const ExpenseProvider = (props) => {
  const [state, setState] = useState({
    list: [],
    loading: false,
    errorMessage: '',
    isApiListEmpty: false,
  });

  const sortExpenseListByDate = (list) =>
    list.sort((e1, e2) => new Date(e2.date) - new Date(e1.date));

  const clearFlags = () =>
    setState({ ...state, errorMessage: '', isApiListEmpty: false });

  const getAll = () => {
    if (state.loading) return;
    if (state.errorMessage) return;
    if (state.isApiListEmpty) return;

    setState({ ...state, loading: true });

    inzApi()
      .get('expense')
      .then((res) => {
        setState({
          ...state,
          loading: false,
          list: sortExpenseListByDate(res.data.list),
          isApiListEmpty: res.data.list.length === 0,
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
    <ExpenseContext.Provider value={{ ...state, clearFlags, getAll, create }}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
