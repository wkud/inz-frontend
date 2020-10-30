import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { ExpenseContext } from '../../context/ExpenseContext';
import ModelFormHeader from '../common-for-models/ModelFormHeader';

const ExpenseForm = () => {
  const [, { create }] = useContext(ExpenseContext);

  const initialForm = {
    product_name: '',
    price: '',
    amount: 1,
    date: new Date().toJSON().slice(0, 10),
    category: 'no category',
  };
  const [formData, setFormData] = useState(initialForm);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      // create(formData); //TODO
      console.log(formData);
      setFormData(initialForm);
    } else {
      console.log('invalid expense data');
    }
  };

  return (
    <>
      <div className='d-flex flex-column align-items-center'>
        <div className='model-view-list'>
          <ModelFormHeader
            headerCaption='New expense'
            clearAction={() => setFormData(initialForm)}
          />
          <Form className='text-left lead-font model-view-stretch' onSubmit={onSubmit}>
            <Row className=' d-flex justify-content-center m-0'>
              <Col xs={12} sm={6} className='p-0 pr-sm-2'>
                <Form.Group controlId='expenseProductName'>
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Product name'
                    required
                    value={formData.product_name}
                    onChange={(e) =>
                      setFormData({ ...formData, product_name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={3} className='p-0 pr-1'>
                <Form.Group controlId='expensePrice'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Price'
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseFloat(e.target.value.replace(',', '.')),
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={3} className='p-0 pl-1'>
                <Form.Group controlId='expenseAmount'>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Amount'
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: parseInt(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} className='p-0 pr-sm-2'>
                <Form.Group controlId='expenseDate'>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='Date'
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} className='p-0'>
                <Form.Group controlId='expenseCategory'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as='select'
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option>No category</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant='primary'
              type='submit'
              className='model-view-stretch'
            >
              Create
            </Button>
          </Form>
          <Button
            className='text-center model-view-stretch'
            variant='secondary'
            href='#expense/list'
          >
            Go back to expense list
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
