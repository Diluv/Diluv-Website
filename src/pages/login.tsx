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
};
let showMFA = false;
const RegisterPage: NextPage = () => (
  <Layout title="Login | Diluv">
    <div className="container">
      <div className="row">
        <div className="col-sm">
        </div>
        <div className="col-sm">
          <div className="pb-md-5 text-center">
            <h1>Login</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="usernameControl" hidden={showMFA}>
              <Form.Label>Username/Email</Form.Label>
              <Form.Control type="text" placeholder="Enter username/email"/>
            </Form.Group>
            <Form.Group controlId="passwordControl" hidden={showMFA}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox" hidden={showMFA}>
              <Form.Check type="checkbox" label="Remember me"/>
            </Form.Group>
            <Form.Group controlId="2faControl" hidden={!showMFA}>
              <Form.Label>Two-Factor Token</Form.Label>
              <Form.Control type="text" placeholder="2FA"/>
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
