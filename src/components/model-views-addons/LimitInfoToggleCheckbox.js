import React from 'react';
import { Form } from 'react-bootstrap';

const LimitInfoToggleCheckbox = ({className, checked, onChange}) => {
  return (
    <Form className={'p-0 align-self-center ' + className}>
      <Form.Check
        type='switch'
        id='savingRateToogle'
        checked={checked}
        onChange={onChange}
        label='Show saving rate'
      />
    </Form>
  )
}

export default LimitInfoToggleCheckbox
