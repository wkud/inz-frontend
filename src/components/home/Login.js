import React from 'react';
import { Button, Form } from 'react-bootstrap';

const Login = ({ xs }) => {
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
        <Button variant='primary' type='submit' className='align-self-center align-self-sm-end mr-sm-5 '>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;
