import React, { useContext, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { ExpenseContext } from '../../context/ExpenseContext';
import Expense from '../expenses/Expense';
import ModelListHeader from '../common-for-models/ModelListHeader';

const ExpenseList = () => {
  const [expenses, { getAll }] = useContext(ExpenseContext);
  const [loaded, setLoaded] = useState(false);

  const getExpenses = () => {
    if (!loaded) {
      getAll();
      setLoaded(true);
    }
    // return expenses.list; //TODO delete dummy data
    return [
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
    ];
  };


  return (
    <div className='d-flex flex-column align-items-center'>
      <div className='model-view-list'>
        <ModelListHeader syncAction={getAll} headerCaption='Expenses' />
        <ListGroup className='scroll'>
          <div className='p-0'>
            {getExpenses().map((expense) => (
              <Expense expense={expense} key={expense.id} />
            ))}
          </div>
        </ListGroup>
        <Button
          className='text-center model-view-stretch'
          href='#expense/form'
        >
          Add new expense
        </Button>
      </div>
    </div>
  );
};

export default ExpenseList;
