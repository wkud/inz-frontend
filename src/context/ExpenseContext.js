import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

const dummyExpenses = [
  {
    id: 3,
    product_name: 'bread',
    price: 2,
    amount: 2,
    date: '2020-11-01',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 4,
    product_name: 'bread',
    price: 2,
    amount: 2,
    date: '2020-10-26',
    user_id: 3,
    category_id: 1,
  },
  {
    id: 5,
    product_name: 'bread',
    price: 2,
    amount: 2,
    date: '2020-10-26',
    user_id: 3,
    category_id: 1,
  },
  {
    id: 7,
    product_name: 'bread',
    price: 3,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 8,
    product_name: 'milk',
    price: 3,
    amount: 6,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 9,
    product_name: 'milk',
    price: 3,
    amount: 6,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 10,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 11,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 12,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 13,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 14,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 15,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 16,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 17,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
  {
    id: 18,
    product_name: 'shopping',
    price: 60,
    amount: 1,
    date: '2020-10-26',
    user_id: 3,
    category_id: 3,
  },
];

export const ExpenseContext = createContext();

export const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState({
    list: [],
    loading: false,
  });

  const getAll = () => {
    if (expenses.loading)
      return 

      setExpenses({...expenses, list: dummyExpenses})
    // setExpenses({ ...expenses, loading: true });
    //
    // inzApi()
    //   .get('expense')
    //   .then((res) => {
    //     setExpenses({
    //       ...expenses,
    //       loading: false,
    //       list: res.data.sort(
    //         (e1, e2) => new Date(e2.date) - new Date(e1.date)
    //       ),
    //     });
    //   })
    //   .catch((err) => {
    //     //TODO catch backend errors
    //     console.log(err);
    //     setExpenses({ ...expenses, loading: false });
    //   });
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
