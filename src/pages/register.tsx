import React, {
  SyntheticEvent, useContext, useRef, useState,
} from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import jwt from 'jwt-decode';
import { Router } from 'next/router';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { post } from '../utils/request';
import { API_URL } from '../utils/api';
import Layout from '../components/Layout';
import { Theme } from '../utils/context';
import Alert from '../components/Alert';

interface Fields {
  username: HTMLInputElement,
  email: HTMLInputElement,
  password: HTMLInputElement,
  passwordConfirm: HTMLInputElement,
  terms: HTMLInputElement
}

function register(
  event: React.SyntheticEvent,
  fields: Fields,
  setErrors: Function,
  setPostRegister: Function,
) {
  event.preventDefault();
  const {
    username, email, password, passwordConfirm, terms,
  } = fields;

  const formData = new FormData();
  formData.append('email', email.value);
  formData.append('username', username.value);
  formData.append('password', password.value);
  formData.append('passwordConfirm', passwordConfirm.value);
  formData.append('terms', terms.checked ? 'true' : 'false');
  post(`${API_URL}/v1/auth/register`, formData).then(() => {
    setErrors([]);
    setPostRegister(true);
  }).catch((Error) => {
    const errors = [];
    if (Error.message) errors.push(Error.message);
    if (Error.response?.statusText) errors.push(Error.response?.statusText);
    setErrors(errors);
  });
}

function renderPostRegister() {
  const theme = useContext(Theme);
  const darkMode = theme.theme === 'dark';
  return (
    <Layout title="Register | Diluv">
      <div className="text-center">
        <h1 className="text-5xl">Register</h1>
      </div>
      <div
        className={`w-5/6 md:w-1/2 mt-5 mx-auto max-w-sm focus:bg-black border rounded
        ${darkMode ? 'bg-dark-600 border-gray-500 shadow-light-lg' : 'bg-gray-100 border-gray-500 shadow-lg'}`}
      >
        <div className="p-4">
          <h6 className="text-2xl font-medium mb-2">Email Verification</h6>
          <p>You should have received an email with a verification link.</p>
          <p className="my-3">if you don't see it, check your spam folder</p>
          <button
            type="button"
            className="block bg-diluv-700 hover:bg-diluv-500 text-diluv-200 hover:text-white py-2 w-full transition-colors duration-200 ease-in"
          >
            Send Again
          </button>
        </div>
      </div>
    </Layout>
  );
}

function showErrors(errors: string[]) {
  const arr: JSX.Element[] = [];
  errors.forEach((error) => {
    arr.push(
      <Alert type="danger" canDismiss className="w-5/6 md:w-1/2 mx-auto" key={error + new Date().getSeconds()}>
        {error}
      </Alert>,
    );
  });
  return arr;
}

function RegisterPage() {
  const [, forceUpdate] = useState({});
  const [errors, setErrors] = useState([]);
  const [postRegister, setPostRegister] = useState(false);

  const fieldUserName = useRef<HTMLInputElement>(null);
  const fieldEmail = useRef<HTMLInputElement>(null);
  const fieldPassword = useRef<HTMLInputElement>(null);
  const fieldPasswordConfirm = useRef<HTMLInputElement>(null);
  const fieldTerms = useRef<HTMLInputElement>(null);

  const validUserName = useRef<boolean>(false);
  const validEmail = useRef<boolean>(false);
  const validPassword = useRef<boolean>(false);
  const validPasswordConfirm = useRef<boolean>(false);
  const validTerms = useRef<boolean>(false);


  if (postRegister) {
    return renderPostRegister();
  }
  const theme = useContext(Theme);

  const shadowValid = theme.theme === 'dark' ? 'shadow-valid-dark' : 'shadow-valid-light';
  const shadowInvalid = theme.theme === 'dark' ? 'shadow-invalid-dark' : 'shadow-invalid-light';

  return (
    <Layout title="Register | Diluv">
      <div className="">
        <div className="md:pb-2 md:pt-3 text-center">
          <h1 className="text-5xl">Register</h1>
        </div>
        {errors && showErrors(errors)}
        <form onSubmit={(e: SyntheticEvent) => register(e, {
          username: fieldUserName.current,
          email: fieldEmail.current,
          password: fieldPassword.current,
          passwordConfirm: fieldPasswordConfirm.current,
          terms: fieldTerms.current,
        } as Fields, setErrors, setPostRegister)}
        >
          <div className="md:flex">
            <div className="md:w-1/4 w-5/6 mx-auto md:mx-0 md:ml-auto md:pr-2 mt-3 md:mt-0">
              <label className="font-bold text-lg" htmlFor="username">
                Username
                <input
                  defaultValue=""
                  type="text"
                  name="username"
                  minLength={3}
                  maxLength={49}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    validUserName.current = /^.{3,49}$/.test(e.target.value);
                    forceUpdate({});
                  }}
                  id="username"
                  ref={fieldUserName}
                  className={`focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black 
                ${validUserName.current ? `focus:shadow-valid ${shadowValid}` : `focus:shadow-invalid ${shadowInvalid}`}`}
                />
              </label>
            </div>
            <div className="md:w-1/4 w-5/6 mx-auto md:mx-0 md:mr-auto md:pl-2 mt-3 md:mt-0">
              <label className="font-bold text-lg" htmlFor="email">
                Email
                <input
                  defaultValue=""
                  type="text"
                  name="username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    validEmail.current = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);
                    forceUpdate({});
                  }}
                  ref={fieldEmail}
                  id="email"
                  className={`focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black 
                ${validEmail.current ? `focus:shadow-valid ${shadowValid}` : `focus:shadow-invalid ${shadowInvalid}`}`}
                />
              </label>
            </div>
          </div>
          <div className="md:flex md:pt-4">
            <div className="md:w-1/4 w-5/6 mx-auto md:mx-0 md:ml-auto md:pr-2 mt-3 md:mt-0">
              <label className="font-bold text-lg" htmlFor="password">
                Password
                <input
                  defaultValue=""
                  type="password"
                  name="password"
                  minLength={8}
                  maxLength={70}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const validLength = /^.{8,}/.test(e.target.value);
                    // TODO maybe more here, like forcing characters
                    validPassword.current = validLength;
                    forceUpdate({});
                  }}
                  id="password"
                  ref={fieldPassword}
                  className={`focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black 
                ${validPassword.current ? `focus:shadow-valid ${shadowValid}` : `focus:shadow-invalid ${shadowInvalid}`}`}
                />
              </label>
            </div>
            <div className="md:w-1/4 w-5/6 mx-auto md:mx-0 md:mr-auto md:pl-2 mt-3 md:mt-0">
              <label className="font-bold text-lg" htmlFor="passwordConfirm">
                Confirm Password
                <input
                  defaultValue=""
                  type="password"
                  name="passwordConfirm"
                  minLength={8}
                  maxLength={70}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let valid = false;
                    if (fieldPassword.current) {
                      if (e.target.value === fieldPassword.current.value) {
                        valid = true;
                      }
                    }
                    validPasswordConfirm.current = valid;
                    forceUpdate({});
                  }}
                  id="passwordConfirm"
                  ref={fieldPasswordConfirm}
                  className={`focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black 
                ${validPasswordConfirm.current ? `focus:shadow-valid ${shadowValid}` : `focus:shadow-invalid ${shadowInvalid}`}`}
                />
              </label>
            </div>
          </div>
          <div className="md:w-full w-5/6 mx-auto md:pl-2 mt-3 md:mt-0">
            <div className="text-center">
              <label htmlFor="terms" className="text-md">
                <input
                  defaultValue="false"
                  type="checkbox"
                  name="terms"
                  defaultChecked={false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    validTerms.current = e.target.checked;
                    forceUpdate({});
                  }}
                  id="terms"
                  ref={fieldTerms}
                  className="focus:outline-none focus:shadow-outline mt-3 mr-2"
                />
                Agree to terms and conditions
              </label>
            </div>
          </div>
          <div className="md:w-1/4 w-5/6 mx-auto mt-1">
            <button
              disabled={
                (validTerms.current.valueOf()
                  && validPasswordConfirm.current.valueOf()
                  && validPassword.current.valueOf()
                  && validEmail.current.valueOf()
                  && validUserName.current.valueOf())
              }
              type="submit"
              className="font-bold block bg-diluv-500 disabled:bg-diluv-500 hover:bg-diluv-700 text-white p-2
              w-full transition-colors duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Register
            </button>
          </div>
        </form>
        <div className="md:w-1/2 w-5/6 mx-auto mt-1 text-center">
          <p>
            Already have an account?
            <Link href="/login"><span className="hover:text-diluv-500 cursor-pointer"> Login!</span></Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

RegisterPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookies = parseCookies(ctx);
  if (cookies.accessToken) {
    const token = jwt<{ exp: number }>(cookies.accessToken);
    const currentTime = new Date().getTime() / 1000;
    if (currentTime > token.exp) {
      destroyCookie(ctx, 'username');
      destroyCookie(ctx, 'accessToken');
    } else if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/',
      });
      ctx.res.end();
    } else {
      // @ts-ignore
      await Router.push('/');
    }
  }
  return {};
};

export default RegisterPage;
