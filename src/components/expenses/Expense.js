import React from 'react';
import { ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { fistCharacterUpperCase } from '../../utility/stringUtility';

const Expense = ({ expense }) => {
  return (
    <>
      <ListGroup.Item>
        <Row className='d-flex flex-row justify-content-between text-nowrap'>
          <Col xs={6} sm={3} className='text-left'>
            {fistCharacterUpperCase(expense.product_name)}
          </Col>
          <Col xs={6} sm={3}>
            <div className='d-flex justify-content-end justify-content-sm-start'>
              <Badge variant='secondary' className='p-1 align-self-left'>
                {fistCharacterUpperCase(expense.category_name)}
              </Badge>
            </div>
          </Col>
          <Col
            xs={6}
            sm={3}
            className='text-secondary text-left text-sm-center'
          >
            {expense.date}
          </Col>
          <Col xs={6} sm={3} className='text-right'>
            {expense.price}zł x {expense.amount} =
            <br className='d-none d-sm-inline d-md-none' />{' '}
            {expense.price * expense.amount}zł
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default Expense;
