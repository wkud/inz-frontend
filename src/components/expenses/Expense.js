import React from 'react';
import { ListGroup, Row, Col, Badge } from 'react-bootstrap';

const Expense = ({ expense }) => {
  const fistCharacterUpperCase = (caption) =>
    caption.charAt(0).toUpperCase() + caption.toLowerCase().slice(1);

  const priceCaption = () => (
    <>
      {expense.price}zł x {expense.amount} =
      <br className='d-none d-sm-inline d-md-none'/> {expense.price * expense.amount}zł
    </>
  );

  const categoryCaption = () => (
    <>{expense.category ? expense.category : 'No category'}</>
  );

  return (
    <>
      <ListGroup.Item>
        <Row className='d-flex flex-row justify-content-between text-nowrap'>
          <Col xs={6} sm={3} className='text-left'>
            {fistCharacterUpperCase(expense.product_name)}
          </Col>
          <Col xs={6} sm={3}>
            <div className='d-flex justify-content-end justify-content-sm-center'>
              <Badge variant='secondary' className='p-1'>
                {categoryCaption()}
              </Badge>
            </div>
          </Col>
          <Col xs={6} sm={3} className='text-secondary text-left text-sm-center'>
            {expense.date}
          </Col>
          <Col xs={6} sm={3} className='text-right'>
            {priceCaption()}
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default Expense;
