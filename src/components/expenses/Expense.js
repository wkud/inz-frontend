import React from 'react';
import { ListGroup, Row, Col, Badge, Card } from 'react-bootstrap';

const Expense = ({ expense }) => {
  const fistCharacterUpperCase = (caption) =>
    caption.charAt(0).toUpperCase() + caption.toLowerCase().slice(1);

  const priceCaption = () => (
    <>
      {expense.price}zł x {expense.amount} = {expense.price * expense.amount}zł
    </>
  );

  const categoryCaption = () => (
    <>{expense.category ? expense.category : 'No category'}</>
  );

  return (
    <>
      <ListGroup.Item className='d-none d-sm-block'>
        <Row className='d-none d-sm-flex flex-column flex-sm-row justify-content-between text-center'>
          <Col xs={6} sm={3} className='text-sm-left'>
            {fistCharacterUpperCase(expense.product_name)}
          </Col>
          <Col xs={6} sm={3}>
            <Badge variant='secondary' className='p-1'>
              {categoryCaption()}
            </Badge>
          </Col>
          <Col xs={6} sm={3} className='text-secondary'>
            {expense.date}
          </Col>
          <Col xs={6} sm={3} className='text-sm-right'>
            {priceCaption()}
          </Col>
        </Row>
      </ListGroup.Item>

      <Card className='d-flex d-sm-none flex-column justify-content-between text-center m-1'>
        <Card.Header as='h5' className='py-1'>
          {fistCharacterUpperCase(expense.product_name)}
        </Card.Header>
        <div>{priceCaption()}</div>
        <div className='mt-1'>
          <Badge variant='secondary' className='p-1 d-inline mr-2'>
            {categoryCaption()}
          </Badge>
          <div className='text-secondary d-inline'>{expense.date}</div>
        </div>
      </Card>
    </>
  );
};

export default Expense;
