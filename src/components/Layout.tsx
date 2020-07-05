import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Head from "next/head";
import SimpleBar from "simplebar-react";
import { HasTheme } from "../interfaces";
import { Theme } from "../utils/context";
import axios, { AxiosError } from "axios";
import Router from 'next/router'

type Props = {
    children: JSX.Element | JSX.Element[]
    title: string
};

function Layout({
    theme,
    children,
    title = "Diluv"
}: Props & HasTheme) {

    const [themeState, setTheme] = useState({
        theme: theme.theme
    });
    const simpleBarRef = useRef<SimpleBar>();

    useEffect(() => {
        // Handles reseting simple bar's position
        const handleRouteChange = () => {
            // @ts-ignore
            simpleBarRef.current?.getScrollElement().scrollTo(0,0)
        }

        Router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])
    return <Theme.Provider value={{
        theme: themeState.theme,
        setTheme: (theme) => {
            setTheme({ theme: theme });

            axios.post("/api/set_theme", { theme: theme }).then(() => {
            }).catch((reason: AxiosError) => {
                console.log(reason);
            });
        },
        toggleTheme: () => {
            let newTheme = (themeState.theme === "dark" ? "light" : "dark");
            setTheme({ theme: newTheme });
            axios.post("/api/set_theme", { theme: newTheme }).then(() => {
            }).catch((reason: AxiosError) => {
                console.log(reason);
            });
        }
    }}>
        <div className={`${themeState.theme === "dark" ? `mode-dark` : `mode-light`}`}>
            <SimpleBar className={`minmax-height`} ref={simpleBarRef}>
                <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-dark-900 dark:text-dark-100`}>
                    <Head>
                        <title>{title}</title>
                        <meta charSet="utf-8"/>
                    </Head>
                    <header>
                        <NavBar/>
                    </header>
                    <main className={`flex-grow`}>
                        {children}
                    </main>
                    <Footer/>
                </div>
            </SimpleBar>
        </div>
    </Theme.Provider>
        ;
}

export default Layout;
