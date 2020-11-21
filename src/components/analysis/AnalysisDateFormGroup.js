import React from 'react';
import { Form } from 'react-bootstrap';

const AnalysisDateFormGroup = ({ id, placeholder, value, onChange }) => {
  return (
    <Form.Group controlId={id} className='m-md-0'>
      {/* <Form.Label>End date</Form.Label> */}
      <Form.Control
        type='date'
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default AnalysisDateFormGroup;
