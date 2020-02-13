import * as React from 'react'
import Layout from '../components/Layout'
import {API_URL} from "../utils/api";
import {RefObject, SyntheticEvent, useContext, useRef, useState} from "react";
import {post} from "../utils/request";
import {destroyCookie, parseCookies} from "nookies";
import jwt from "jwt-decode";
import {Router} from "next/router";
import {NextPageContext} from "next";
import Link from "next/link";
import {Theme} from "../utils/Contexts";

type RequirementTest = {
  arguments: string,
  body: string
}

type requirement = {
  validMsg: string,
  invalidMsg: string,
  met: boolean,
  testFunc: RequirementTest
}

type InputField = {
  name: string,
  displayName: string,
  type: string,
  value: string,
  isValid: boolean,
  validationRegex: string,
  requirements: Record<string, requirement>,
  refField?: string,
  maxLength?: number,
  minLength?: number
}

function register(event: React.SyntheticEvent, fields: Record<string, InputField> | null, setErrors: Function, setPostRegister: Function) {
  event.preventDefault();
  // @ts-ignore
  const {email, username, password, terms} = fields;

  const formData = new FormData();
  formData.append('email', email.value);
  formData.append('username', username.value);
  formData.append('password', password.value);
  formData.append('terms', terms.value);
  post(`${API_URL}/v1/auth/register`, formData).then(() => {
    setErrors([]);
    setPostRegister(true);
  }).catch(Error => {
    setErrors(Error.response?.statusText);
  });


}

function allValid(fields: Record<string, InputField>) {
  let valid = true;
  for (let index in fields) {
    if (!fields[index].isValid) {
      valid = false;
    }
  }
  return valid;
}


function handleChange(event: React.ChangeEvent<HTMLInputElement>, field: InputField, fields: Record<string, InputField>, forceUpdate: Function) {
  for (let x in field.requirements) {
    field.requirements[x].met = false;
  }
  let val = event.target.value;
  if (event.target.type === "checkbox") {
    val = String(event.target.checked);
  }
  field.value = val;
  let valid = new RegExp(field.validationRegex).test(field.value);
  if (field.refField) {
    valid = valid && fields[field.refField].value === field.value;
    field.requirements["reference"].met = valid;
  }

  let allMet = true;
  for (let index in field.requirements) {
    if (field.requirements[index].testFunc) {
      let testFunc = new Function(field.requirements[index].testFunc.arguments, field.requirements[index].testFunc.body);
      field.requirements[index].met = testFunc(field, fields);
      if (!field.requirements[index].met) {
        allMet = false;
      }
    }
  }

  field.isValid = valid && allMet;
  forceUpdate({});

}


function fillRequirements(field: InputField): JSX.Element[] {
  let arr: JSX.Element[] = [];

  for (let x in field.requirements) {
    let req: requirement = field.requirements[x];
    if (req.met) {
      arr.push(<p className={"text-success mb-0"} key={"validMsg" + x}>{req.validMsg}</p>);
    } else {
      arr.push(<p className={"text-danger mb-0"} key={"invalidMsg" + x}>{req.invalidMsg}</p>);
    }
  }

  return arr;
}


function renderPostRegister() {
  let theme = useContext(Theme);
  let darkMode = theme.theme === "dark";
  return (
    <Layout title="Register | Diluv">
      <div className="text-center">
        <h1 className={"text-5xl"}>Register</h1>
      </div>
      <div className={`w-5/6 md:w-1/2 mt-5 mx-auto max-w-sm focus:bg-black border ${darkMode ? "bg-dark-600 border-gray-500 shadow-light-lg" : "bg-gray-100 border-gray-500 shadow-lg"} rounded`}>
        <div className={"p-4"}>
          <h6 className={"text-2xl font-medium mb-2"}>Email Verification</h6>
          <p>You should have received an email with a verification link.</p>
          <p className={"my-3"}>if you don't see it, check your spam folder</p>
          <button className={"block bg-diluv-700 hover:bg-diluv-500 text-diluv-200 hover:text-white py-2 w-full transition-colors duration-200 ease-in"}>Send
            Again
          </button>
        </div>
      </div>
    </Layout>
  );
}

// @ts-ignore
function RegisterPage() {
  const [, forceUpdate] = useState({});
  const [errors, setErrors] = useState([]);
  const [postRegister, setPostRegister] = useState(false);

  const fields: RefObject<Record<string, InputField>> = useRef({
    "email": {
      name: "email",
      displayName: "Email",
      type: "email",
      value: "",
      isValid: false,
      validationRegex: `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`,
      requirements: {
        "valid": {
          invalidMsg: "Valid Email Address: ❌",
          validMsg: "Valid Email Address: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: `return new RegExp(field.validationRegex).test(field.value);`
          }
        }
      }
    },
    "username": {
      name: "username",
      displayName: "Username",
      type: "string",
      value: "",
      isValid: false,
      validationRegex: `^.{3,49}$`,
      requirements: {
        "minLength": {
          invalidMsg: "At least 3 characters: ❌",
          validMsg: "At least 3 characters: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length >= 3;"
          }
        },
        "maxLength": {
          invalidMsg: "Less than 50 characters: ❌",
          validMsg: "Less than 50 characters: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length <= 50;"
          }
        }
      },
      minLength: 3,
      maxLength: 49
    },
    "password": {
      name: "password",
      displayName: "Password",
      type: "password",
      value: "",
      isValid: false,
      validationRegex: `^.{8,}`,
      requirements: {
        "minLength": {
          invalidMsg: "At least 8 characters: ❌",
          validMsg: "At least 8 characters: ✔",
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length >= 8;"
          },
          met: false
        },
        "maxLength": {
          invalidMsg: "Less than 70 characters: ❌",
          validMsg: "Less than 70 characters: ✔",
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length < 70;"
          },
          met: false
        }
      },
      minLength: 8,
      maxLength: 70
    },
    "passwordConfirm": {
      name: "passwordConfirm",
      displayName: "Confirm Password",
      type: "password",
      value: "",
      isValid: false,
      validationRegex: `^.{8,}`,
      refField: "password",
      requirements: {
        "minLength": {
          invalidMsg: "At least 8 characters: ❌",
          validMsg: "At least 8 characters: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length >= 8;"
          }
        },
        "maxLength": {
          invalidMsg: "Less than 70 characters: ❌",
          validMsg: "Less than 70 characters: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return field.value.length < 70;"
          }
        },
        "reference": {
          invalidMsg: "Passwords match: ❌",
          validMsg: "Passwords match: ✔",
          met: false,
          testFunc: {
            arguments: "field, fields",
            body: "return fields[field.refField].value===field.value;"
          }
        }
      },
      minLength: 8,
      maxLength: 69
    },
    "terms": {
      name: "terms",
      displayName: "Terms",
      type: "checkbox",
      value: "false",
      isValid: false,
      validationRegex: `true`,
      requirements: {}

    }
  });

  if (postRegister) {
    return renderPostRegister();
  }
  return (<Layout title="Register | Diluv">
      <div className="">
        <div className="pb-md-2 md:pt-3 text-center">
          <h1 className={"text-5xl"}>Register</h1>
        </div>
        <form onSubmit={(e: SyntheticEvent) => register(e, fields.current, setErrors, setPostRegister)}>
          <div className={"md:flex"}>
            <div className={"md:w-1/4 w-5/6 mx-auto md:mx-0 md:ml-auto md:pr-2 mt-3 md:mt-0"}>
              <label className={"font-bold text-lg"}>{fields.current && fields.current.username.displayName}</label>
              <input defaultValue={fields.current ? fields.current.username.value : ""} type={fields.current ? fields.current.username.type : ""}
                     name={fields.current ? fields.current.username.name : ""} minLength={fields.current ? fields.current.username.minLength : 0}
                     maxLength={fields.current ? fields.current.username.maxLength : 100}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       // @ts-ignore
                       handleChange(e, fields.current.username, fields.current, forceUpdate);
                     }}
                     className={"focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black"}/>
            </div>
            <div className={"md:w-1/4 w-5/6 mx-auto md:mx-0 md:mr-auto md:pl-2 mt-3 md:mt-0"}>
              <label className={"font-bold text-lg"}>{fields.current ? fields.current.email.displayName : ""}</label>
              <input defaultValue={fields.current ? fields.current.email.value : ""} type={fields.current ? fields.current.email.type : ""}
                     name={fields.current ? fields.current.email.name : ""} minLength={fields.current ? fields.current.email.minLength : 0}
                     maxLength={fields.current ? fields.current.email.maxLength : 100}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       // @ts-ignore
                       handleChange(e, fields.current.email, fields.current, forceUpdate);
                     }}
                     className={"focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black"}/>
            </div>
          </div>
          <div className={"md:flex md:pt-4"}>
            <div className={"md:w-1/4 w-5/6 mx-auto md:mx-0 md:ml-auto md:pr-2 mt-3 md:mt-0"}>
              <label className={"font-bold text-lg"}>{fields.current ? fields.current.password.displayName : ""}</label>
              <input defaultValue={fields.current ? fields.current.password.value : ""} type={fields.current ? fields.current.password.type : ""}
                     name={fields.current ? fields.current.password.name : ""} minLength={fields.current ? fields.current.password.minLength : 0}
                     maxLength={fields.current ? fields.current.password.maxLength : 100}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       // @ts-ignore
                       handleChange(e, fields.current.password, fields.current, forceUpdate);
                     }}
                     className={"focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black"}/>
            </div>
            <div className={"md:w-1/4 w-5/6 mx-auto md:mx-0 md:mr-auto md:pl-2 mt-3 md:mt-0"}>
              <label className={"font-bold text-lg"}>{fields.current ? fields.current.passwordConfirm.displayName : ""}</label>
              <input defaultValue={fields.current ? fields.current.passwordConfirm.value : ""}
                     type={fields.current ? fields.current.passwordConfirm.type : ""} name={fields.current ? fields.current.passwordConfirm.name : ""}
                     minLength={fields.current ? fields.current.passwordConfirm.minLength : 0}
                     maxLength={fields.current ? fields.current.passwordConfirm.maxLength : 100}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       // @ts-ignore
                       handleChange(e, fields.current.passwordConfirm, fields.current, forceUpdate);
                     }}
                     className={"focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black"}/>
            </div>
          </div>
          <div className={"md:w-1/4 w-5/6 mx-auto md:pl-2 mt-3 md:mt-0"}>
            <div className={"text-center"}>
              <input defaultValue={fields.current ? fields.current.terms.value : ""}
                     type={fields.current ? fields.current.terms.type : ""} name={fields.current ? fields.current.terms.name : ""}
                     minLength={fields.current ? fields.current.terms.minLength : 0}
                     maxLength={fields.current ? fields.current.terms.maxLength : 100}
                     defaultChecked={fields.current ? fields.current.terms.value === "true" : false}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       // @ts-ignore
                       handleChange(e, fields.current.terms, fields.current, forceUpdate);
                     }}
                     className={"focus:outline-none focus:shadow-outline border border-gray-300 mt-3 text-black mr-2"}/>
              <label className={"text-md"}>Agree to terms and conditions</label>
            </div>
          </div>
          <div className={"md:w-1/4 w-5/6 mx-auto mt-2"}>
            <button disabled={true} type={"submit"} className={"block bg-diluv-700 hover:bg-diluv-500 text-diluv-200 hover:text-white p-2 w-full transition-colors duration-200 ease-in disabled:opacity-100 disabled:text-diluv-100 disabled:bg-diluv-700"}>Register</button>
          </div>
        </form>
        <div className={"md:w-1/2 w-5/6 mx-auto mt-3 text-center"}>
          <p>Already have an account? <Link href={"/login"}><span className={"hover:text-diluv-500 cursor-pointer"}>Login!</span></Link></p>
        </div>
      </div>
    </Layout>
  );
}

RegisterPage.getInitialProps = async (ctx: NextPageContext) => {
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
  return {};
};

export default RegisterPage
