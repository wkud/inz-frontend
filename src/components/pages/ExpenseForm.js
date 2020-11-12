import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { ExpenseContext } from '../../context/ExpenseContext';
import { CategoryContext } from '../../context/CategoryContext';
import ModelFormHeader from '../common-for-models/ModelFormHeader';
import { fistCharacterUpperCase } from '../../utility/stringUtility';
import { todayInIsoFormat } from '../../utility/dateUtility';

const ExpenseForm = () => {
  const expense = useContext(ExpenseContext);
  const category = useContext(CategoryContext);

  const initialForm = {
    product_name: '',
    price: '',
    amount: 1,
    date: todayInIsoFormat(),
    category_id: -1,
  };
  const [formData, setFormData] = useState(initialForm);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      expense.create(formData);
      console.log(formData);
      setFormData(initialForm);
    } else {
      console.log('invalid expense data');
    }
  };

  const noCategoryItem = { id: -1, name: 'No category' };
  const getCategories = () => {
    if (category.list.length === 0) category.getAll();
  };
  useEffect(() => getCategories());

  const syncCategories = () => {
    category.clearFlags(); //force try again
    category.getAll();
  };

  const parseForm = (stringNumber, parsingFunction) => {
    const parsed = parsingFunction(stringNumber);
    return isNaN(parsed) ? '' : parsed;
  };

  return (
    <>
      <div className='d-flex flex-column align-items-center'>
        <ModelFormHeader
          headerCaption='New expense'
          clearAction={() => setFormData(initialForm)}
        />
        <Form className='text-left lead-font model-view' onSubmit={onSubmit}>
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
                  placeholder='0,00 zł'
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseForm(
                        e.target.value.replace(',', '.'),
                        parseFloat
                      ),
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
                      amount: parseForm(e.target.value, parseInt),
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
                <InputGroup>
                  <Form.Control
                    as='select'
                    required
                    value={formData.category_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category_id: parseInt(e.target.value),
                      })
                    }
                  >
                    {[noCategoryItem, ...category.list].map((c) => (
                      <option key={c.id} value={c.id}>
                        {fistCharacterUpperCase(c.name)}
                      </option>
                    ))}
                  </Form.Control>
                  <InputGroup.Append>
                    <Button variant='outline-primary' onClick={syncCategories}>
                      <i className='fas fa-sync-alt' />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Button variant='primary' type='submit' className='model-view'>
            Create
          </Button>
        </Form>
        <Button
          className='text-center model-view'
          variant='secondary'
          href='#expense/list'
        >
          Go back to expense list
        </Button>
      </div>
    </>
  );
};

export default ExpenseForm;
