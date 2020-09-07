import "../css/index.css";
import "../css/markdown.css";
import "../css/admonition.css";
import "../css/reactselect.css";

import "simplebar/dist/simplebar.min.css";
import React from "react";
import { AppProps } from "next/app";
// @ts-ignore
import { Provider } from "next-auth/client";
import { SITE_URL } from "utils/api";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const { session } = pageProps;
    return (
        <Provider options={{ site: SITE_URL, clientMaxAge: 10 * 60, keepAlive: 10 * 60 }} session={session}>
            <Component {...pageProps} />
        </Provider>
    );
}
