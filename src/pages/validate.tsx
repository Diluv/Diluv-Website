import React from 'react';
import { NextPageContext } from 'next/dist/next-server/lib/utils';
import Layout from '../components/Layout';
import { API_URL } from '../utils/api';
import { post } from '../utils/request';

// function showErrors(errors: string[]) {
//   return (
//     <div>
//       <h3 className="text-center">Sorry, we couldn't verify your user!</h3>
//       <h3 className="text-center">Try click the link in your email again</h3>
//       <h4 className="text-center text-danger">{errors}</h4>
//     </div>
//   );
// }

type Props = {
  valid: boolean
  hasEmail: boolean
  hasCode: boolean
  errors: string[]
};

function RegisterPage({
  valid, hasEmail, hasCode,
}: Props) {
  return (
    <Layout title="Validation | Diluv">
      <div className="container">
        <div className="pb-md-2 pt-md-3 text-center">
          <h1>
            Validation
            {valid && hasEmail && hasCode ? 'Complete!' : 'Failed!'}
          </h1>
        </div>
        {/* <Container> */}
        {/*  {errors && errors.length > 0 && showErrors(errors)} */}
        {/* </Container> */}
      </div>
    </Layout>
  );
}


RegisterPage.getInitialProps = async ({ query: { emailQuery, queryCode } }: NextPageContext) => {
  let valid: boolean = true;
  const email = Array.isArray(emailQuery) ? emailQuery[0] : emailQuery;
  const code = Array.isArray(queryCode) ? queryCode[0] : queryCode;
  const errors: string[] = [];

  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('code', code);

  await post(`${API_URL}/v1/auth/verify`, formData).then(() => {
    valid = true;
  }).catch((Error) => {
    errors.push(Error.response?.statusText);
    valid = false;
  });

  return {
    valid, hasEmail: email.length > 0, hasCode: code.length > 0, errors,
  };
};

export default RegisterPage;
