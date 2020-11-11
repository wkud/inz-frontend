import React, { useContext, useEffect } from 'react';
// import { LimitContext } from '../../context/LimitContext';
import { ListGroup, Button } from 'react-bootstrap';
import ModelListHeader from '../common-for-models/ModelListHeader';

const LimitList = () => {
//   const limit = useContext(LimitContext);

//   const getExpenses = () => {
//     if (limit.list.length === 0) limit.getAll();
//   };
//   useEffect(() => getExpenses());

//   const syncExpenses = () => {
//     limit.clearFlags(); //force try again
//     limit.getAll();
//   };

//   const noItemsCaption = () =>
//     limit.loading
//       ? 'Loading...'
//       : limit.errorMessage
//       ? 'Cannot load expense list due to an error'
//       : 'There are no items to be displayed';

  return (
    <div className='d-flex flex-column align-items-center'>
      {/* <ModelListHeader syncAction={syncExpenses} headerCaption='Expenses' /> */}
      <ModelListHeader headerCaption='Limits' />
      <ListGroup className='model-view scroll'>
        <div className='p-0'>
          {/* {limit.list.length === 0 ? (
            <ListGroup.Item>{noItemsCaption()}</ListGroup.Item>
          ) : (
            limit.list.map((expense) => (
              <Expense expense={expense} key={expense.id} />
            ))
          )} */}
        </div>
      </ListGroup>
      <Button className='text-center model-view' href='#limit/form'>
        Add new limit
      </Button>
    </div>
  );
};

export default LimitList;
