import userEvent from '@testing-library/user-event';
import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

export const ExpenseContext = createContext();

export const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState({
    list: [],
    loading: false,
  });

  //funcs

  //get all
  const getAll = () => {
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
      });
    return expenses.list;
  };
  //create

  return (
    <ExpenseContext.Provider value={[expenses, { setExpenses, getAll }]}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
