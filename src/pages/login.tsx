import * as React from 'react'
import Layout from '../components/Layout'
import {useState} from "react";
import {Alert, Button, Col, Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {SyntheticEvent} from "react";
import {API_URL} from "../utils/api";
import Link from "next/link";
import jwt from 'jwt-decode'
import {destroyCookie, parseCookies, setCookie} from 'nookies';
import {NextRouter, Router, useRouter} from "next/router";
import {NextPageContext} from "next";

function login(event: SyntheticEvent, username: string, password: string, setErrors: Function, router: NextRouter) {
  event.preventDefault();
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  // formData.append('mfa', mfa);

  fetch(`${API_URL}/v1/auth/login`, {
    method: "post",
    headers: {
      'Accept': 'application/json'
    },

    body: formData
  })
    .then((response) => {
      if (response.status == 200) {

        response.json().then(data => {
          setCookie(null, "accessToken", data.data.accessToken, {
            expires: new Date(data.data.expiredAt)
          });
          // @ts-ignore
          setCookie(null, "username", jwt(data.data.accessToken)["username"], {
            expires: new Date(data.data.expiredAt)
          });
          setCookie(null, "refreshToken", data.data.refreshToken, {
            expires: new Date(data.data.refreshExpiredAt)
          });
        });
        setErrors([]);

        router.push("/");
        return;
      }
      response.json().then(data => {
        setErrors(data["message"]);
      })
    });
}


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);
  const router = useRouter();
  return (<Layout title="Login | Diluv">
      <div className="container">
        <div className="pb-md-2 pt-md-3 text-center">
          <h1>Login</h1>
        </div>
        <Container>
          {errors.length != 0 &&
          <Row className={"justify-content-md-center"}>
            <Col md={4}>
              <Alert variant={"danger"}>
                {errors}
              </Alert>
            </Col>
          </Row>
          }
          <Form onSubmit={(e: SyntheticEvent) => login(e, username, password, setErrors, router)}>
            <Form.Row className={"justify-content-md-center"}>
              <Col md={4}>
                <Form.Group controlId="usernameId" className={"mb-1"}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type={"username"}
                    name={"username"}
                    defaultValue={""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    minLength={3}
                    maxLength={50}

                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className={"justify-content-md-center"}>
              <Col md={4}>
                <Form.Group controlId="passwordId" className={"mb-1"}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={"password"}
                    name={"pasword"}
                    defaultValue={""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    minLength={8}
                    maxLength={70}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className={"justify-content-md-center pt-2"}>
              <Col md={4}>
                <Button type="submit" disabled={username.trim().length < 3 && password.trim().length < 8} block>Login</Button>
              </Col>
            </Form.Row>
          </Form>
          <Row className={"justify-content-md-center pt-2"}>
            <Col md={4}>
              <p className={"text-center"}>Don't have an account? <Link href={"/register"}><a>Register now!</a></Link></p>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  let cookies = parseCookies(ctx);
  if (cookies["accessToken"]) {
    let token = jwt<{ exp: number }>(cookies["accessToken"]);
    let current_time = new Date().getTime() / 1000;
    if (current_time > token.exp) {
      destroyCookie(ctx, "username");
      destroyCookie(ctx, "accessToken");
    } else {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: '/'
        });
        ctx.res.end()
      } else {
        // @ts-ignore
        await Router.push('/');
      }
    }
  }

  return {}
};

export default LoginPage
