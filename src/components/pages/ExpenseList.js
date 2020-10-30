import React, { useContext } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { ExpenseContext } from '../../context/ExpenseContext';
import Expense from '../expenses/Expense';
import ModelListHeader from '../common-for-models/ModelListHeader';

const ExpenseList = () => {
  const [expenses, { getAll }] = useContext(ExpenseContext);

  const getExpenses = () => {
    if (expenses.list.length === 0)
      getAll();
    return expenses.list
  };
  return (
    <div className='d-flex flex-column align-items-center'>
        <ModelListHeader syncAction={getAll} headerCaption='Expenses' />
        <ListGroup className='model-view scroll'>
          <div className='p-0'>
            {getExpenses().map((expense) => (
              <Expense expense={expense} key={expense.id} />
            ))}
          </div>
        </ListGroup>
        <Button
          className='text-center model-view'
          href='#expense/form'
        >
          Add new expense
        </Button>
    </div>
  );
};

export default ExpenseList;
