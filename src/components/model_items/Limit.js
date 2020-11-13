import React from 'react';
import { ListGroup, Row, Col, ProgressBar } from 'react-bootstrap';
import { fistCharacterUpperCase } from '../../utility/stringUtility';

const Limit = ({ limit, rateVisible }) => {
  const LimitDurationComponent = ({ clsName }) => (
    <Col
      xs={6}
      sm={6}
      className={'text-secondary text-left text-sm-center ' + clsName}
    >
      {limit.duration_start} to {limit.duration_end}
    </Col>
  );

  return (
    <ListGroup.Item>
      <Row className='d-flex flex-row justify-content-between text-nowrap'>
        <Col xs={6} sm={3} className='text-left'>
          {fistCharacterUpperCase(limit.category_name)}
        </Col>
        <LimitDurationComponent clsName='d-none d-sm-inline' />
        <Col xs={6} sm={3} className='text-right'>
          {limit.planned_amount}zł
        </Col>
        <LimitDurationComponent clsName='d-sm-none' />
      </Row>
      {rateVisible && (
        <div className='pt-2'>
          <ProgressBar className='' now={80} /> 
        </div>
      )}
    </ListGroup.Item>
  );
};

export default Limit;
