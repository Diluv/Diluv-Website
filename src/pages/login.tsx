import * as React from 'react'
import Layout from '../components/Layout'
import {NextPage} from 'next';
import {Button, Form} from 'react-bootstrap';
import {Formik} from 'formik';
import * as yup from 'yup';
import {API_URL} from "../utils/api";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  remember: yup.bool().required(),
  mfa: yup.string(),
});

function login(data: object) {
  // @ts-ignore
  const {username, password, mfa} = data;

  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('mfa', mfa);

  fetch(`${API_URL}/v1/auth/login`, {
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
          <Formik
            validationSchema={schema}
            onSubmit={login}
            initialValues={{
              username: '',
              password: '',
              mfa: '',
              remember: false
            }}>
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
              }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="usernameId" hidden={showMFA}>
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
                <Form.Group controlId="passwordId" hidden={showMFA}>
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
                <Form.Group hidden={showMFA}>
                  <Form.Check
                    required
                    name="remember"
                    label="Remember Me"
                    isInvalid={!!errors.remember}
                    value={`${values.remember}`}
                    feedback={errors.remember}
                    onChange={handleChange}
                    id="terms"
                  />
                </Form.Group>
                <Form.Group controlId="mfaId" hidden={!showMFA}>
                  <Form.Label>MultiFactor</Form.Label>
                  <Form.Control
                    type="text"
                    name="mfa"
                    value={values.mfa}
                    onChange={handleChange}
                    isValid={touched.mfa && !errors.mfa}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
