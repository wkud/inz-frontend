import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../../context/user/UserContext';

const Register = () => {
  const [, , register] = useContext(UserContext);
  const submit = () => register();
  return (
    <>
      <Form className='d-flex flex-column justify-content-between align-content-start '>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>

        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='Confirm Password' />
        </Form.Group>
        <Button
          variant='primary'
          // type='submit' //todo
          className='align-self-center align-self-sm-end mr-sm-5'
          onClick={submit}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;
