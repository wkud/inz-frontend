import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Login = ({ xs }) => {
  return (
    <>
      <div>
        <div>Login</div>
        <div>email</div>
        <div>password</div>
      </div>
      <div>
        <Row>
          <Col xs={6} />
          <Col xs={5}>
            <Button class='btn btn-primary btn-lg' href='#' role='button'>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
