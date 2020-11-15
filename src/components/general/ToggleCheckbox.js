import React from 'react';
import { Form } from 'react-bootstrap';

const ToggleCheckbox = ({clsName, checked, onChange, label, id}) => {
  return (
    <Form className={'p-0 align-self-center ' + clsName}>
      <Form.Check
        type='switch'
        id={id}
        checked={checked}
        onChange={onChange}
        label={label}
      />
    </Form>
  )
}

export default ToggleCheckbox
