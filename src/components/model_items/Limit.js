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

  const progressBarValue = () =>
    Math.floor((limit.info.spent_amount / limit.planned_amount) * 100);

  return (
    <ListGroup.Item>
      <Row className='d-flex flex-row justify-content-between text-nowrap'>
        <Col xs={6} sm={3} className='text-left'>
          {fistCharacterUpperCase(limit.category_name)}
        </Col>
        <LimitDurationComponent clsName='d-none d-sm-inline' />
        <Col xs={6} sm={3} className='text-right'>
          {rateVisible &&
            (progressBarValue() === 0 ? (
              <span className='text-dark'>{limit.info.spent_amount}%</span>
            ) : (
              limit.info.spent_amount
            ))}
          {/* {rateVisible && <span className={limit.info.saving_rate === 'good' ? 'text-success' : 'text-danger'}>{limit.info.spent_amount}</span>} */}
          {rateVisible && ' / '}
          {limit.planned_amount}zł
        </Col>
        <LimitDurationComponent clsName='d-sm-none' />
      </Row>
      {rateVisible && progressBarValue() !== 0 && (
        <div className='pt-2'>
          <ProgressBar
            now={progressBarValue() === 0 ? 0 : Math.max(5, progressBarValue())}
            label={`${progressBarValue()}%`}
          />
        </div>
      )}
    </ListGroup.Item>
  );
};

export default Limit;
