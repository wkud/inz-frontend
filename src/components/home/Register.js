import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Register = ({ xs }) => {
  return (
    <>
      <div>Register</div>
      <div>email</div>
      <div>password</div>
      <div>confirm password</div>
      <Row>
        <Col xs={6} />
        <Col xs={5}>
          <Button class='btn btn-primary btn-lg ' href='#' role='button'>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Register;
