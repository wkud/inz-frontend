import React, { useContext, useState } from 'react';
import { CategoryContext } from '../../context/CategoryContext';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

const CategoryForm = () => {
  const category = useContext(CategoryContext);

  const initialForm = { name: '' };
  const [formData, setFormData] = useState(initialForm);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      category.create(formData);
      console.log(formData);
      setFormData(initialForm);
    } else {
      console.log('invalid category name');
    }
  };
  return (
    <Row>
      <Col xs={12}>
        <Form className='text-left lead-font model-view' onSubmit={onSubmit}>
          <Form.Group controlId='categoryName' className='m-0'>
            <div className='d-flex model-view'>
              <InputGroup>
                <Form.Control
                  type='text'
                  placeholder='Enter category name'
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup.Append>
                <Button className='text-nowrap' variant='primary' type='submit'>
                  <span className='d-none d-sm-inline'>Add category</span>
                  <i className='fas fa-plus d-sm-none'></i>
                </Button>
              </InputGroup.Append>
            </div>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default CategoryForm;
