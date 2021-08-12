import "css/index.css";
import "css/markdown.css";
import "css/admonition.css";
import "css/reactselect.css";
import "css/alerts.css";
import "css/nprogress.css";
import "css/tables.css";
import "css/grids.css";
import "simplebar/dist/simplebar.min.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { Provider } from "next-auth/client";
import { ThemeContext } from "../utils/Context";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps): JSX.Element {

    const [theme, setTheme] = useState(`light`);
    useLayoutEffect(() => {
        let item = localStorage.getItem("pageTheme");
        if(item!==null){
           setTheme(item);
        }
    }, [])
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/sw.js");
            });
        }
    }, []);

    return (
        <Provider session={pageProps.session}>
            <ThemeContext.Provider value={{
                pageTheme: theme,
                setTheme: (pageTheme) => {

                    setTheme(pageTheme);
                    document.documentElement.style.overflow = "hidden";
                    document.body.clientWidth;
                    if (pageTheme === "dark") {
                        document.documentElement.classList.remove("light");
                        document.documentElement.classList.add("dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                        document.documentElement.classList.add("light");
                    }
                    document.documentElement.setAttribute("data-color-scheme", pageTheme);
                    document.documentElement.style.overflow = "";
                    localStorage.setItem("pageTheme", pageTheme);
                }
            }}>
                <Component {...pageProps} />
            </ThemeContext.Provider>
        </Provider>
    );
}



