import "../css/index.css";
import "../css/markdown.css";
import "../css/admonition.css";
import "../css/reactselect.css";
import "../css/alerts.css";
import "../css/nprogress.css";
import "../css/tables.css";
import "../css/grids.css";
import "simplebar/dist/simplebar.min.css";
import React, { useEffect } from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { Provider } from "next-auth/client";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/sw.js");
            });
        }
    }, []);

    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
}
