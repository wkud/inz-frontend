import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {
  firstDayOfCurrentMonth,
  lastDayOfCurrentMonth,
} from '../../utility/dateUtility';
import AnalysisDateFormGroup from './AnalysisDateFormGroup';

const AnalysisPeriodForm = ({ getAction }) => {
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
      getAction(formData);
      console.log(formData);
      setFormData(initialForm);
    } else {
      console.log('invalid analysis period data');
    }
  };

  return (
    <Form className='text-left lead-font' onSubmit={onSubmit}>
      <Row className='chart-width m-0  align-items-end'>
        <Col xs={12} sm={6} md={4} className='p-0 pr-sm-1'>
          <AnalysisDateFormGroup
            id='limitDurationStart'
            label='First day to analyze'
            value={formData.duration_start}
            onChange={(e) =>
              setFormData({ ...formData, duration_start: e.target.value })
            }
          />
        </Col>
        <Col xs={12} sm={6} md={4} className='p-0 pl-sm-1 '>
          <AnalysisDateFormGroup
            id='limitDurationEnd'
            label='Last day to analyze'
            value={formData.duration_end}
            onChange={(e) =>
              setFormData({ ...formData, duration_end: e.target.value })
            }
          />
        </Col>
        <Col xs={12} md={4} className='p-0 pl-md-2'>
          <Button
            variant='primary'
            type='submit'
            className='stretch-width d-block justify-content-between'
          >
            Analyze
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AnalysisPeriodForm;
