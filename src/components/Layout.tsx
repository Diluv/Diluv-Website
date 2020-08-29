import React, { useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Head from "next/head";
import SimpleBar from "simplebar-react";
import Router from "next/router";
import { NextSeo } from "next-seo";
import { SITE_URL } from "../utils/api";
import { initGA, pageView } from "./analytics/Analytics";

type Props = {
    children: JSX.Element | JSX.Element[];
    title: string;
    description: string;
    canonical: string;
    url: string;
    image: string;
};

function Layout({ children, title = "Diluv", description, canonical, url, image }: Props): JSX.Element {
    const simpleBarRef = useRef(null);
    useEffect(() => {

        initGA(url);
        // Handles resetting simple bar's position
        const handleRouteChange = (url: string) => {
            // @ts-ignore
            simpleBarRef.current?.getScrollElement().scrollTo(0, 0);
            pageView(url);
        };
        Router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            Router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);

    return (<>
        <NextSeo
            title={title}
            description={description}
            canonical={`${SITE_URL}${canonical}`}
            openGraph={{
                type: "website",
                title: title,
                url: `${SITE_URL}${url}`,
                description: description,
                images: [{ url: image, alt: (title + " logo") }],
                site_name: "Diluv"
            }}
            twitter={{
                cardType: "summary",
                site: "@DiluvMods",
                handle: "@DiluvMods"
            }}
        />

        <div id={"theme_definer"} className={"test"}>
            <SimpleBar className={`minmax-height`} ref={simpleBarRef}>
                <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-dark-900 dark:text-dark-100`}>
                    <Head>
                        <title>{title}</title>
                        <meta charSet="utf-8"/>
                    </Head>
                    <header>
                        <NavBar/>
                    </header>
                    <main className={`flex-grow`}>{children}</main>
                    <Footer/>
                </div>
            </SimpleBar>
        </div>
    </>);
}

export default Layout;
