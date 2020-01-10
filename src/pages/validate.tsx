import * as React from 'react'
import Layout from '../components/Layout'
import {Container} from 'react-bootstrap';
import {NextPageContext} from "next/dist/next-server/lib/utils";
import {API_URL} from "../utils/api";
import {post} from "../utils/request";

function showErrors(errors: string[]) {
  console.log(errors);
  return (<div>
    <h3 className={"text-center"}>Sorry, we couldn't verify your user!</h3>
    <h3 className={"text-center"}>Try click the link in your email again</h3>
    <h4 className={"text-center text-danger"}>{errors}</h4>
  </div>);
}

// @ts-ignore
function RegisterPage({valid, hasEmail, hasCode, errors}) {


  return (<Layout title="Validation | Diluv">
      <div className="container">
        <div className="pb-md-2 pt-md-3 text-center">
          <h1>Validation {valid && hasEmail && hasCode ? "Complete!" : "Failed!"}</h1>
        </div>
        <Container>
          {errors && errors.length > 0 && showErrors(errors)}
        </Container>
      </div>
    </Layout>
  );
}

// @ts-ignore
RegisterPage.getInitialProps = async ({query}: NextPageContext) => {

  let valid: boolean = true;
  // @ts-ignore
  let email: string = query["email"];
  // @ts-ignore
  let code: string = query["code"];
  let errors: string[] = [];

  const formData = new FormData();
  formData.append('email', email);
  formData.append('code', code);

  await post(`${API_URL}/v1/auth/verify`, formData).then(() => {
    valid = true;
  }).catch(Error => {
    errors.push(Error.response?.statusText);
    valid = false;
  });

  return {valid: valid, hasEmail: email.length > 0, hasCode: code.length > 0, errors: errors};
};

export default RegisterPage
