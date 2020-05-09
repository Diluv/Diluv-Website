import "../css/index.css"
import React from "react";
import { AppProps } from "next/app";
import 'simplebar/dist/simplebar.min.css';


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp