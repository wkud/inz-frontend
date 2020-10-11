import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
const Home = () => {
  return (
    <Container fluid>
      <Row className='mid-font'>
        <Col xs />
        <Col
          xs={4}
          className='bg-highlight d-flex flex-column justify-content-between'
        >
          <div>
            <Row>
              <Col>Login</Col>
            </Row>
            <Row>
              <Col>email</Col>
            </Row>
            <Row>
              <Col>password</Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col xs={7} />
              <Col xs={4}>
                <Button class='btn btn-primary btn-lg' href='#' role='button'>
                  Sign in
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs />
        <Col className='bg-highlight' xs={4}>
          <Row>
            <Col>Register</Col>
          </Row>
          <Row>
            <Col>email</Col>
          </Row>
          <Row>
            <Col>password</Col>
          </Row>
          <Row>
            <Col>confirm password</Col>
          </Row>
          <Row>
            <Col xs={8} />
            <Col xs={3}>ok</Col>
          </Row>
        </Col>
        <Col xs />
      </Row>
    </Container>
  );
};

export default Home;
