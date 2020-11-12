import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { LimitContext } from '../../context/LimitContext';
import { CategoryContext } from '../../context/CategoryContext';
import ModelFormHeader from '../common-for-models/ModelFormHeader';
import { fistCharacterUpperCase } from '../../utility/stringUtility';
import { firstDayOfCurrentMonth, lastDayOfCurrentMonth } from '../../utility/dateUtility';

const LimitForm = () => {
  const limit = useContext(LimitContext);
  const category = useContext(CategoryContext);

  const initialForm = {
    duration_start: firstDayOfCurrentMonth(),
    duration_end: lastDayOfCurrentMonth(),
    planned_amount: '',
    category_id: -1,
  };
  const [formData, setFormData] = useState(initialForm);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      limit.create(formData);
      console.log(formData);
      setFormData(initialForm);
    } else {
      console.log('invalid limit data');
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
    <div className='d-flex flex-column align-items-center'>
      <ModelFormHeader
        headerCaption='New limit'
        clearAction={() => setFormData(initialForm)}
      />
      <Form className='text-left lead-font model-view' onSubmit={onSubmit}>
        <Row className=' d-flex justify-content-center m-0'>
          <Col xs={12} sm={6} className='p-0 pr-sm-1'>
            <Form.Group controlId='limitCategory'>
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
          <Col xs={12} sm={6} className='p-0 pl-sm-1'>
              <Form.Group controlId='expensePrice'>
                <Form.Label>Max amount to spend</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='0,00 zł'
                  required
                  value={formData.planned_amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      planned_amount: parseForm(
                        e.target.value.replace(',', '.'),
                        parseFloat
                      ),
                    })
                  }
                />
              </Form.Group>
            </Col>
          <Col xs={12} sm={6} className='p-0 pr-sm-1'>
            <Form.Group controlId='limitDurationStart'>
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Start date'
                required
                value={formData.duration_start}
                onChange={(e) =>
                  setFormData({ ...formData, duration_start: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} className='p-0 pl-sm-1'>
            <Form.Group controlId='limitDurationEnd'>
              <Form.Label>End date</Form.Label>
              <Form.Control
                type='date'
                placeholder='End date'
                required
                value={formData.duration_end}
                onChange={(e) =>
                  setFormData({ ...formData, duration_end: e.target.value })
                }
              />
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
        href='#limit/list'
      >
        Go back to limit list
      </Button>
    </div>
  );
};

export default LimitForm;
