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

  const isLimitFinished = () =>
    limit.info.duration_past >= limit.info.duration_length;
  const spentPercent = () =>
    Math.floor((limit.info.spent_amount / limit.planned_amount) * 100);

  const savingRateCaption = () => {
    if (isLimitFinished()) {
      const savings = Math.abs(limit.planned_amount - limit.info.spent_amount);
      return limit.info.saving_rate === 'good'
        ? `You saved ${savings}zł!`
        : "You've exceeded the limit.";
    } else
      return limit.info.saving_rate === 'good'
        ? 'Good job - keep saving!'
        : "You're spending fast!";
  };

  const durationCaption = () => {
    return `Days passed: ${limit.info.duration_past} / ${limit.info.duration_length}`;
  };

  return (
    <ListGroup.Item>
      <Row className='d-flex flex-row justify-content-between'>
        <Col xs={6} sm={3} className='text-left'>
          {fistCharacterUpperCase(limit.category_name)}
        </Col>
        <LimitDurationComponent clsName='d-none d-sm-inline' />
        <Col xs={6} sm={3} className='text-right'>
          {limit.info.spent_amount}
          {' / '}
          {limit.planned_amount}zł
        </Col>
        <LimitDurationComponent clsName='d-sm-none' />
      </Row>
      {rateVisible && (
        <>
          {
            <div className='pt-2'>
              <ProgressBar>
                <ProgressBar
                  className='progress-bar-font'
                  variant={
                    spentPercent() > 100
                      ? 'danger'
                      : isLimitFinished()
                      ? 'success'
                      : 'primary'
                  }
                  animated
                  label={`spent ${spentPercent()}%`}
                  now={spentPercent()}
                />
              </ProgressBar>
            </div>
          }
          <Row className='small-font text-dark'>
            <Col sm={4} className='text-left'>
              {durationCaption()}
            </Col>
            <Col sm={4} className='base-font text-wrap'>
              {savingRateCaption() + ' '}
              {limit.info.saving_rate === 'good' ? (
                <i className='far fa-smile-beam text-success' />
              ) : spentPercent() > 100 ? (
                <i className='far fa-angry text-danger' />
              ) : (
                <i className='far fa-frown text-warning' />
              )}
            </Col>
            <Col sm={4} className='text-right'>
              total spending {spentPercent()}%
            </Col>
          </Row>
        </>
      )}
    </ListGroup.Item>
  );
};

export default Limit;
