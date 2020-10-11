import React from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import Credits from './components/home/credits';
import './style/App.css';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <div className='parent d-flex flex-column justify-content-between '>
      <Navbar className='d-flex flex-row justify-content-between align-items-center'>
        <div className='big-font pr-2'>Welcome! </div>
        <div className='pb-1'>
          Sign in to continue or sign up if you didn't already.
        </div>
      </Navbar>
      <Container fluid>
        <Row className='big-font'>
          <Col xs />
          <Col
            className='bg-highlight d-flex flex-column justify-content-between'
            xs={4}
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
                <Col xs={8} />
                <Col xs={3}>ok</Col>
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
      <Credits />
    </div>
  );
}

export default App;
