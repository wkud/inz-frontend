import React from 'react';
import { Form } from 'react-bootstrap';

const AnalysisDateFormGroup = ({ id, label, value, onChange }) => {
  return (
    <Form.Group controlId={id} className='mb-2 m-md-0'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type='date'
        required
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default AnalysisDateFormGroup;
