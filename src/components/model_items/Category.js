import React from 'react'
import { ListGroup, Row, Col } from 'react-bootstrap';
import { fistCharacterUpperCase } from '../../utility/stringUtility';

const Category = ({category}) => {
  return (
    <ListGroup.Item>
        <Row className='d-flex flex-row justify-content-between text-nowrap'>
          <Col xs={6} sm={12} className='text-left'>
            {fistCharacterUpperCase(category.name)}
          </Col>
        </Row>
      </ListGroup.Item>
  )
}

export default Category
