import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import AnalysisDateFormGroup from './AnalysisDateFormGroup';

const AnalysisPeriodForm = ({ getAction, defaultFormData }) => {
  const [formData, setFormData] = useState(defaultFormData);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      getAction(formData);
      console.log(formData);
      setFormData(defaultFormData);
    } else {
      console.log('invalid analysis period data');
    }
  };

  return (
    <Form className='text-left lead-font' onSubmit={onSubmit}>
      <Row className='chart-width m-0  align-items-end'>
        <Col xs={12} sm={6} md={4} className='p-0 pr-sm-1'>
          <AnalysisDateFormGroup
            id='analysisPeriodStart'
            label='First day to analyze'
            value={formData.period_start}
            onChange={(e) =>
              setFormData({ ...formData, period_start: e.target.value })
            }
          />
        </Col>
        <Col xs={12} sm={6} md={4} className='p-0 pl-sm-1 '>
          <AnalysisDateFormGroup
            id='analysisPeriodEnd'
            label='Last day to analyze'
            value={formData.period_end}
            onChange={(e) =>
              setFormData({ ...formData, period_end: e.target.value })
            }
          />
        </Col>
        <Col xs={12} md={4} className='p-0 pl-md-2'>
          <Button variant='primary' type='submit' className='stretch-width'>
            Analyze
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AnalysisPeriodForm;
