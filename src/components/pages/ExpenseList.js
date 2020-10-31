import React, { useContext, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { ExpenseContext } from '../../context/ExpenseContext';
import Expense from '../expenses/Expense';
import ModelListHeader from '../common-for-models/ModelListHeader';

const ExpenseList = () => {
  const expense = useContext(ExpenseContext);

  const getExpenses = () => {
    if (expense.list.length === 0) expense.getAll();
  };
  useEffect(() => getExpenses());

  const noItemsCaption = () =>
    expense.loading
      ? 'Loading...'
      : expense.errorMessage
      ? 'Cannot load expense list due to an error'
      : 'There are no items to be displayed';

  return (
    <div className='d-flex flex-column align-items-center'>
      <ModelListHeader syncAction={expense.getAll} headerCaption='Expenses' />
      <ListGroup className='model-view scroll'>
        <div className='p-0'>
          {expense.list.length === 0 ? (
            <ListGroup.Item>{noItemsCaption()}</ListGroup.Item>
          ) : (
            expense.list.map((expense) => (
              <Expense expense={expense} key={expense.id} />
            ))
          )}
        </div>
      </ListGroup>
      <Button className='text-center model-view' href='#expense/form'>
        Add new expense
      </Button>
    </div>
  );
};

export default ExpenseList;
