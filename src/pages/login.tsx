import React, { SyntheticEvent, useRef, useState } from 'react';
import jwt from 'jwt-decode';
import { setCookie } from 'nookies';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import returnTo from '../utils/navigation';
import { API_URL } from '../utils/api';
import Layout from '../components/Layout';
import Alert from '../components/Alert';
import { post } from '../utils/request';
import { AccessToken, Data, Login } from '../interfaces';
import Button from "../components/Button";

interface Fields {
  username: HTMLInputElement,
  password: HTMLInputElement,
}

function login(event: SyntheticEvent, fields: Fields, setErrors: Function, router: NextRouter) {
  event.preventDefault();
  const formData = new FormData();
  formData.append('username', fields.username.value);
  formData.append('password', fields.password.value);
  // formData.append('mfa', mfa);

  post(`${API_URL}/v1/auth/login`, formData).then((response) => {
    const { data }: Data<Login> = response.data;
    setCookie(null, 'accessToken', data.accessToken, {
      expires: new Date(data.expiredAt),
    });

    setCookie(null, 'username', jwt<AccessToken>(data.accessToken).username, {
      expires: new Date(response.data.data.expiredAt),
    });
    setCookie(null, 'refreshToken', data.refreshToken, {
      expires: new Date(data.refreshExpiredAt),
    });
    setErrors([]);
    returnTo(router);
  }).catch((Error) => {
    const errors = [];
    console.log(Error.message);

    if (Error.message) errors.push(Error.message);
    if (Error.response?.statusText) errors.push(Error.response?.statusText);
    setErrors(errors);
  });
}

function showErrors(errors: string[]) {
  const arr: JSX.Element[] = [];
  errors.forEach((error) => {
    arr.push(
      <Alert type="danger" canDismiss className="w-5/6 md:w-1/3 mx-auto" key={error + new Date().getSeconds()}>
        {error}
      </Alert>,
    );
  });
  return arr;
}


function LoginPage() {
  const [, forceUpdate] = useState({});
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const fieldUserName = useRef<HTMLInputElement>(null);
  const fieldPassword = useRef<HTMLInputElement>(null);

  return (
    <Layout title="Login | Diluv">
      <div>
        <div className="md:mb-2 md:pt-3 text-center">
          <h1 className="text-5xl">Login</h1>
        </div>
        {errors && showErrors(errors)}
        <form
          className=""
          onSubmit={(e: SyntheticEvent) => login(e, {
            username: fieldUserName.current,
            password: fieldPassword.current,
          } as Fields, setErrors, router)}
        >
          <div className="md:w-1/3 w-5/6 mx-auto mt-3">
            <label className="font-bold text-lg" htmlFor="username">
              Username
              <input
                defaultValue=""
                type="text"
                name="username"
                minLength={3}
                id="username"
                ref={fieldUserName}
                onChange={() => {
                  forceUpdate({});
                }}
                className="focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black"
              />
            </label>
          </div>
          <div className="md:w-1/3 w-5/6 mx-auto mt-3">
            <label className="font-bold text-lg" htmlFor="password">
              Password
              <input
                defaultValue=""
                type="password"
                name="password"
                minLength={8}
                maxLength={70}
                id="password"
                ref={fieldPassword}
                onChange={() => {
                  forceUpdate({});
                }}
                className="focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black"
              />
            </label>
          </div>
          <div className="md:w-1/3 w-5/6 mx-auto mt-4">
            <Button
              disabled={(fieldUserName.current && fieldPassword.current
                ? fieldUserName.current.value.trim().length === 0 || fieldPassword.current.value.trim().length === 0 : true)}>
              Login
            </Button>
          </div>
        </form>
        <div className="md:w-1/2 w-5/6 mx-auto my-3 text-center">
          <p>
            Don't have an account?
            <Link href="/register"><span className="hover:text-diluv-500 cursor-pointer"> Register now!</span></Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
