import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Head from "next/head";
import SimpleBar from "simplebar-react";
import { HasSession, HasTheme } from "../interfaces";
import { Theme, Auth } from "../utils/context";
import axios, { AxiosError } from "axios";
import Router from "next/router";
import { NextSeo } from "next-seo";
import { SITE_URL } from "../utils/api";

type Props = {
    children: JSX.Element | JSX.Element[];
    title: string;
    description: string;
    canonical: string;
    url: string;
    image: string;
};

function Layout({ theme, children, title = "Diluv", session, description, canonical, url, image }: Props & HasTheme & HasSession): JSX.Element {
    const [themeState, setTheme] = useState({
        theme: theme.theme
    });
    const simpleBarRef = useRef(null);
    useEffect(() => {
        // Handles resetting simple bar's position
        const handleRouteChange = () => {
            // @ts-ignore
            simpleBarRef.current?.getScrollElement().scrollTo(0, 0);
        };
        Router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            Router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);

    return (
        <Theme.Provider
            value={{
                theme: themeState.theme,
                setTheme: (theme) => {
                    setTheme({ theme: theme });

                    axios
                        .post("/api/set_theme", { theme: theme })
                        .then(() => {})
                        .catch((reason: AxiosError) => {
                            console.log(reason);
                        });
                },
                toggleTheme: () => {
                    const newTheme = themeState.theme === "dark" ? "light" : "dark";
                    setTheme({ theme: newTheme });
                    axios
                        .post("/api/set_theme", { theme: newTheme })
                        .then(() => {})
                        .catch((reason: AxiosError) => {
                            console.log(reason);
                        });
                }
            }}
        >
            <Auth.Provider
                value={{
                    session: session
                }}
            >
                <NextSeo
                    title={title}
                    description={description}
                    canonical={`${SITE_URL}${canonical}`}
                    openGraph={{
                        type: "website",
                        title: title,
                        url: `${SITE_URL}${url}`,
                        description: description,
                        images: [{ url: image, width: 211, height: 406, alt: "diluv open graph image" }],
                        site_name: "Diluv"
                    }}
                    twitter={{
                        cardType: "summary",
                        site: "@DiluvMods",
                        handle: "@DiluvMods"
                    }}
                />

                <div className={`${themeState.theme === "dark" ? `mode-dark` : `mode-light`}`}>
                    <SimpleBar className={`minmax-height`} ref={simpleBarRef}>
                        <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-dark-900 dark:text-dark-100`}>
                            <Head>
                                <title>{title}</title>
                                <meta charSet="utf-8" />
                            </Head>
                            <header>
                                <NavBar />
                            </header>
                            <main className={`flex-grow`}>{children}</main>
                            <Footer />
                        </div>
                    </SimpleBar>
                </div>
            </Auth.Provider>
        </Theme.Provider>
    );
}

export default Layout;
