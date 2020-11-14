import React from 'react';
import { Col } from 'react-bootstrap';

const LimitDuration = ({ clsName, durationStart, durationEnd }) => {
  return (
    <Col
      xs={12}
      sm={6}
      className={'text-secondary text-left text-sm-center ' + clsName}
    >
      {durationStart} to {durationEnd}
    </Col>
  );
};

export default LimitDuration;
