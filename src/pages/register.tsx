import * as React from 'react'
import Layout from '../components/Layout'
import {NextPage} from 'next';
import {Button, Form} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import {API_URL} from "../utils/api";

// TODO Fix
const schema = yup.object().shape({
  email: yup.string().email().required(),
  emailConfirm: yup.string().email().required()
    .oneOf([yup.ref('email'), "TODO"]),
  username: yup.string().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required()
    .oneOf([yup.ref('password'), "TODO"]),
  terms: yup.bool().required(),
});

function register(data: object) {
  // @ts-ignore
  const {email, username, password, terms} = data;

  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('username', username);
  formData.append('password', password);
  formData.append('terms', terms);

  fetch(`${API_URL}/v1/auth/register`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },

    body: formData
  })
    .then((response) => {
      console.log(response);
    });
}

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
          <Formik
            validationSchema={schema}
            onSubmit={register}
            initialValues={{
              email: '',
              emailConfirm: '',
              username: '',
              password: '',
              passwordConfirm: '',
              terms: false
            }}>
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
              }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="emailId">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="emailConfirmId">
                  <Form.Label>Email Confirmation</Form.Label>
                  <Form.Control
                    type="text"
                    name="emailConfirm"
                    value={values.emailConfirm}
                    onChange={handleChange}
                    isValid={touched.emailConfirm && !errors.emailConfirm}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="usernameId">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isValid={touched.username && !errors.username}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="passwordId">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="passwordConfirmId">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    isValid={touched.passwordConfirm && !errors.passwordConfirm}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    required
                    name="terms"
                    label="Agree to terms and conditions"
                    isInvalid={!!errors.terms}
                    value={`${values.terms}`}
                    feedback={errors.terms}
                    onChange={handleChange}
                    id="terms"
                  />
                </Form.Group>
                <Button type="submit">Submit form</Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-sm">
        </div>
      </div>
    </div>
  </Layout>
);

export default RegisterPage
