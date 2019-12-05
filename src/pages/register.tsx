import * as React from 'react'
import Layout from '../components/Layout'
import {NextPage} from 'next';
import {Button, Form} from 'react-bootstrap';

const handleSubmit = (event: any) => {
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log(form);
};

const RegisterPage: NextPage = () => (
  <Layout title="Register | Diluv">
    <div className="container">
      <div className="row">
        <div className="col-sm">
        </div>
        <div className="col-sm">
          <div className="pb-md-5 text-center">
            <h1>Register</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="emailControl">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"/>
            </Form.Group>
            <Form.Group controlId="usernameControl">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username"/>
            </Form.Group>
            <Form.Group controlId="passwordControl">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-sm">
        </div>
      </div>
    </div>
  </Layout>
);

export default RegisterPage
