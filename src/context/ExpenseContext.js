import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

export const ExpenseContext = createContext();

export const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState({
    list: [],
    loading: false,
  });

  const getAll = () => {
    setExpenses({ ...expenses, loading: true });

    inzApi()
      .get('expense')
      .then((res) => {
        setExpenses({
          ...expenses,
          loading: false,
          list: res.data.sort(
            (e1, e2) => new Date(e2.date) - new Date(e1.date)
          ),
        });
      })
      .catch((err) => {
        //TODO catch backend errors
        console.log(err);
        setExpenses({ ...expenses, loading: false });
      });
    return expenses.list;
  };

  const create = (newExpenseData) => {
    setExpenses({ ...expenses, loading: true });

    //TODO format newExpenseData to API format (category string to id)
    inzApi()
      .post('expense', newExpenseData)
      .then((res) => {
        setExpenses({
          ...expenses,
          loading: false,
          list: [...expenses.list, newExpenseData],
        });
      })
      .catch((err) => {
        //TODO catch backend errors
        console.log(err);
        setExpenses({ ...expenses, loading: false });
      });
  };

  return (
    <ExpenseContext.Provider
      value={[expenses, { setExpenses, getAll, create }]}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};
