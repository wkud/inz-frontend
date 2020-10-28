import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [, {login}] = useContext(UserContext);

  const credentialsInitialState = {
    email: '',
    password: '',
  };
  const [credentials, setCredentials] = useState(credentialsInitialState);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      login(credentials.email, credentials.password); //TODO validate data

      setCredentials(credentialsInitialState);
    } else {
      console.log('invalid credentials');
    }
  };
  return (
    <>
      <Form
        className='d-flex flex-column justify-content-between align-content-start'
        onSubmit={onSubmit}
      >
        <Form.Group controlId='loginEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='loginPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          className='align-self-center align-self-sm-end mr-sm-5'
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;
