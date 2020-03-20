import React from 'react';
import { NextPageContext } from 'next/dist/next-server/lib/utils';
import Layout from '../components/Layout';
import { API_URL } from '../utils/api';
import { post } from '../utils/request';
import { AxiosError } from "axios";

function showErrors(errors: string[]) {
  return (
    <div className="mx-auto">
      <h3 className="text-center">Sorry, we couldn't verify your user!</h3>
      <h3 className="text-center">Try click the link in your email again</h3>
      <h4 className="text-center text-danger">{errors}</h4>
    </div>
  );
}

type Props = {
  valid: boolean
  hasEmail: boolean
  hasCode: boolean
  errors: string[]
};

function RegisterPage({
  valid, hasEmail, hasCode, errors
}: Props) {
  if (valid) {
    return (
      <Layout title="Validation | Diluv">
        <div className={`w-5/6 md:w-1/2 mt-5 mx-auto max-w-md text-center`}>
          <h1 className="text-4xl mb-2">Validation Complete!</h1>
          <h2>You can now log in and enjoy the text that darkhax needs to write</h2>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout title="Validation | Diluv">
        <div className={`w-5/6 md:w-1/2 mt-5 mx-auto max-w-md text-center`}>
          <h1 className="text-4xl mb-2">Validation Failed!</h1>
          <h2>Something went wrong, maybe Darkhax has more info to go with the error below</h2>
          {errors && errors.length > 0 && showErrors(errors)}
        </div>

      </Layout>
    );
  }
}


RegisterPage.getInitialProps = async ({ query: { email, code }, res }: NextPageContext) => {
  let valid: boolean = true;
  const errors: string[] = [];

  await post(`${API_URL}/v1/auth/verify`, { email: email, code: code }).then(() => {
    valid = true;
  }).catch((Error: AxiosError) => {
    valid = false;
    errors.push(Error.response?.data.message);
  });
  return {
    valid, hasEmail: email.length > 0, hasCode: code.length > 0, errors,
  };
};

export default RegisterPage;
