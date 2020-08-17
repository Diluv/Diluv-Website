import "../css/index.css";
import "simplebar/dist/simplebar.min.css";
import React from "react";
import { AppProps } from "next/app";
// @ts-ignore
import { Provider } from "next-auth/client";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const { session } = pageProps;
    return (
        <Provider options={{ site: process.env.NEXT_STATIC_SITE_URL, clientMaxAge: 10 * 60, keepAlive: 10 * 60 }} session={session}>
            <Component {...pageProps} />
        </Provider>
    );
}
