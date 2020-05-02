import React, { ReactNode } from "react";
import { AuthProvider } from "oidc-react";

const oidcConfig = {
  onSignIn: async (user: any) => {
    console.log(user);
    window.location.href = window.location.href.split('?')[0]
  },
  authority: "http://127.0.0.1:5000",
  clientId:
    "DILUV_WEBSITE",
  responseType: "code",
  scope: "openid profile offline_access",
  autoSignIn: false,
  redirectUri: "http://localhost:3000"
};


const Auth = (props: { children: ReactNode }) => {
  return <AuthProvider {...oidcConfig}>{props.children}</AuthProvider>;
};

export default Auth;
