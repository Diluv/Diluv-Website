import "../css/index.css";
import "simplebar/dist/simplebar.min.css";
import React from "react";
import { AppProps } from "next/app";
// @ts-ignore
import { Provider } from "next-auth/client";

export default ({ Component, pageProps }: AppProps) => {
    const { session } = pageProps;
    return (
        <Provider options={{ site: process.env.NEXT_STATIC_SITE_URL, clientMaxAge: 5 * 60 }} session={session}>
            <Component {...pageProps} />
        </Provider>
    );
}
