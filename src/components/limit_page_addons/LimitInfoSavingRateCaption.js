import React from 'react';
import { Col } from 'react-bootstrap';

const LimitInfoSavingRateCaption = ({
  spentPercent,
  savings,
  isSavingRateGood,
  isLimitFinished,
}) => {
  const savingRateCaption = () =>
    spentPercent > 100
      ? "You've exceeded the limit."
      : isLimitFinished && isSavingRateGood
      ? `You saved ${savings}zł!`
      : isSavingRateGood
      ? 'Good job - keep saving!'
      : "You're spending too much!";

  const iconClassName = () =>
    isSavingRateGood
      ? 'far fa-smile-beam text-success'
      : spentPercent > 100
      ? 'far fa-angry text-danger'
      : 'far fa-frown text-warning';

  return (
    <Col sm={4} className='base-font text-wrap'>
      {savingRateCaption() + ' '}
      <i className={iconClassName()} />
    </Col>
  );
};

export default LimitInfoSavingRateCaption;
