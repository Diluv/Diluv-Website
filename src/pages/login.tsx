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
import User from "../components/icons/User";
import LockClosed from "../components/icons/LockClosed";

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
  const [focusedUsername, setFocusedUsername] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);

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
            <label className="text-lg" htmlFor="username">
              Username
            </label>
            <div className={"relative my-auto group"}>
              <User
                className={`absolute pointer-events-none ml-2 my-3 fill-current duration-200 ease-in ${focusedUsername || (fieldUserName.current && fieldUserName.current.value) ? `transition-colors ` + (focusedUsername ? `text-diluv-500` : `text-diluv-400`): `transition-none`}`}
                width={"1rem"} height={"1rem"}/>
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
                placeholder={"Enter your Username"}
                onFocus={() => setFocusedUsername(true)}
                onBlur={() => setFocusedUsername(false)}
                style={{ textIndent: "1.75rem" }}
                className={`focus:outline-none bg-transparent border-b border-gray-300 focus:border-diluv-500 mt-2 py-2 px-1 block w-full transition-none focus:transition-colors duration-200 ease-in`}
              />
            </div>
          </div>
          <div className="md:w-1/3 w-5/6 mx-auto mt-3">
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <div className={"relative my-auto group"}>
              <LockClosed
                className={`absolute pointer-events-none ml-2 my-3 fill-current duration-200 ease-in ${focusedPassword || (fieldPassword.current && fieldPassword.current.value) ? `transition-colors ` + (focusedPassword ? `text-diluv-500` : `text-diluv-400`): `transition-none`}`}
                width={"1rem"} height={"1rem"}/>
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
              placeholder={"Enter your Password"}
              onFocus={() => setFocusedPassword(true)}
              onBlur={() => setFocusedPassword(false)}
              style={{ textIndent: "1.75rem" }}
              className={`focus:outline-none bg-transparent border-b border-gray-300 focus:border-diluv-500 mt-2 py-2 px-1 block w-full transition-none focus:transition-colors duration-200 ease-in`}
            />
            </div>
          </div>
          <div className="md:w-1/3 w-5/6 mx-auto mt-4">
            <button
              disabled={(fieldUserName.current && fieldPassword.current
                ? fieldUserName.current.value.trim().length === 0 || fieldPassword.current.value.trim().length === 0 : true)}
              type="submit"
              className="btn-diluv"
            >
              Login
            </button>
          </div>
        </form>
        <div className="md:w-1/2 w-5/6 mx-auto my-3 text-center">
          <p>
            Don't have an account?
            <Link href="/register"><span className="hover:text-diluv-500 cursor-pointer transition-none hover:transition-colors duration-100 ease-in"> Register now!</span></Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
