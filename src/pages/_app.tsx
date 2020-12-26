import "../css/index.css";
import "../css/markdown.css";
import "../css/admonition.css";
import "../css/reactselect.css";
import "../css/alerts.css";
import "../css/nprogress.css";
import "simplebar/dist/simplebar.min.css";

import React, { useEffect } from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
// @ts-ignore
import { Provider } from "next-auth/client";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/sw.js");
            });
        }
    }, []);

    const { session } = pageProps;
    return (
        <Provider options={{ clientMaxAge: 10 * 60, keepAlive: 15 * 60 }} session={session}>
            <Component {...pageProps} />
        </Provider>
    );
}
