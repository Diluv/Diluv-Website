// import {Alert, Button, Col, Container, Form} from "react-bootstrap";
// import Row from "react-bootstrap/Row";
import * as React from 'react'
import {SyntheticEvent, useRef, useState} from 'react'
import Layout from '../components/Layout'
import {API_URL} from "../utils/api";
import jwt from 'jwt-decode'
import {setCookie} from 'nookies';
import {NextRouter, useRouter} from "next/router";
import {returnTo} from "../utils/navigation";
import Link from "next/link";
import Alert from "../components/Alert";
import {post} from "../utils/request";

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


  post(`${API_URL}/v1/auth/login`, formData).then((data) => {

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
    setErrors([]);
    returnTo(router);
  }).catch(Error => {
    let errors = [];
    if (Error.message)
      errors.push(Error.message);
    if (Error.response?.statusText)
      errors.push(Error.response?.statusText);
    setErrors(errors);
  });

}

function showErrors(errors: string[]) {
  let arr = [];
  for (let error of errors) {
    arr.push(<Alert type={"danger"} canDismiss={true} className={"w-5/6 md:w-1/3 mx-auto"} key={error + new Date().getSeconds()}> {error} </Alert>)
  }
  return arr;
}


function LoginPage() {
  const [, forceUpdate] = useState({});
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const fieldUserName = useRef<HTMLInputElement>(null);
  const fieldPassword = useRef<HTMLInputElement>(null);

  return (<Layout title="Login | Diluv">
      <div>
        <div className="md:mb-2 md:pt-3 text-center">
          <h1 className={"text-5xl"}>Login</h1>
        </div>
        {errors && showErrors(errors)}
        <form className={""} onSubmit={(e: SyntheticEvent) => login(e, {
          username: fieldUserName.current,
          password: fieldPassword.current,
        } as Fields, setErrors, router)}>
          <div className={"md:w-1/3 w-5/6 mx-auto mt-3"}>
            <label className={"font-bold text-lg"} htmlFor={"username"}>Username</label>
            <input defaultValue={""} type={"text"}
                   name={"username"}
                   minLength={3}
                   id={"username"}
                   ref={fieldUserName}
                   onChange={(e) => {
                     forceUpdate({});
                   }}
                   className={"focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black"}/>
          </div>
          <div className={"md:w-1/3 w-5/6 mx-auto mt-3"}>
            <label className={"font-bold text-lg"} htmlFor={"password"}>Password</label>
            <input defaultValue={""} type={"password"}
                   name={"password"}
                   minLength={8}
                   maxLength={70}
                   id={"password"}
                   ref={fieldPassword}
                   onChange={(e) => {
                     forceUpdate({});
                   }}
                   className={"focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black"}/>
          </div>
          <div className={"md:w-1/3 w-5/6 mx-auto mt-4"}>
            <button
              disabled={(fieldUserName.current && fieldPassword.current ? fieldUserName.current.value.trim().length === 0 || fieldPassword.current.value.trim().length === 0 : true)}
              type={"submit"}
              className={"block bg-diluv-700 disabled:bg-diluv-700 hover:bg-diluv-500 text-diluv-200 disabled:text-diluv-200 hover:text-white p-2 w-full transition-colors duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"}>Register
            </button>
          </div>
        </form>
        <div className={"md:w-1/2 w-5/6 mx-auto my-3 text-center"}>
          <p>Don't have an account? <Link href={"/register"}><span className={"hover:text-diluv-500 cursor-pointer"}>Register now!</span></Link></p>
        </div>

      </div>
    </Layout>
  );
}

export default LoginPage
