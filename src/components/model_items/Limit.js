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

  const savingRateCaption = () => {
    if (limit.info.duration_past >= limit.info.duration_length) { //is duration finished
      const savings = Math.abs(limit.planned_amount - limit.info.spent_amount);
      return limit.info.saving_rate === 'good'
        ? `You saved ${savings}zł!`
        : `Limit exceeded by ${savings}zł`;
    } else
      return limit.info.saving_rate === 'good'
        ? 'Good job - keep saving!'
        : "You've spent too much!";
  };
  const durationCaption = () => {
    const percent = Math.floor(
      (limit.info.duration_past / limit.info.duration_length) * 100
    );
    if (percent === 100) return 'Finished';
    else if (percent === 0) return "Didn't started yet";
    else
      return `Days past: ${limit.info.duration_past} / ${limit.info.duration_length} (${percent}%)`;
  };

  return (
    <ListGroup.Item>
      <Row className='d-flex flex-row justify-content-between text-nowrap'>
        <Col xs={6} sm={3} className='text-left'>
          {fistCharacterUpperCase(limit.category_name)}
        </Col>
        <LimitDurationComponent clsName='d-none d-sm-inline' />
        <Col xs={6} sm={3} className='text-right'>
          {rateVisible && limit.info.spent_amount}
          {rateVisible && ' / '}
          {limit.planned_amount}zł
        </Col>
        <LimitDurationComponent clsName='d-sm-none' />
      </Row>
      {rateVisible && (
        <>
          {progressBarValue() !== 0 && <div className='pt-2'>
            <ProgressBar
              now={
                progressBarValue() === 0 ? 0 : Math.max(5, progressBarValue())
              }
            />
          </div>}
          <Row className='small-font text-dark'>
            <Col sm={4} className='text-left'>
              {durationCaption()}
            </Col>
            <Col sm={4} className='base-font'>{savingRateCaption() + ' '} 
            {limit.info.saving_rate === 'good' ? <i className="far fa-smile-beam primary text-success"/> : <i className="far fa-frown text-danger"/>}
            </Col>
            <Col sm={4} className='text-right'>
              spent {progressBarValue()}%
            </Col>
          </Row>
        </>
      )}
    </ListGroup.Item>
  );
};

export default Limit;
