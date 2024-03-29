import React, { useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Head from "next/head";
import SimpleBar from "simplebar-react";
import Router from "next/router";
import { NextSeo } from "next-seo";
import { SITE_URL } from "utils/api";
import { useSession } from "next-auth/client";

import Script from "next/script";
import { darkmodejs } from "../utils/darkmode";


type Props = {
    children: JSX.Element | JSX.Element[];
    title: string;
    description: string;
    canonical: string;
    url: string;
    image: string;
};

export default function Layout({ children, title = "Diluv", description, canonical, url, image }: Props): JSX.Element {
    const [session, loading] = useSession();

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={`${SITE_URL}${canonical}`}
                openGraph={{
                    type: "website",
                    title: title,
                    url: `${SITE_URL}${url}`,
                    description: description,
                    images: [{ url: image, alt: title + " logo" }],
                    site_name: "Diluv"
                }}
                twitter={{
                    cardType: "summary",
                    site: "@DiluvMods",
                    handle: "@DiluvMods"
                }}
            />
            <Script
                src="https://static.cloudflareinsights.com/beacon.min.js"
                data-cf-beacon='{"token": "64a45ed5ff4042c2ac41f77363936c76", "spa": true}'
                defer={true}
            />
            <Script dangerouslySetInnerHTML={{ __html: darkmodejs }} strategy={"afterInteractive"} />

            <div>
                <div className={`minmax-height`}>
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
                </div>
            </div>
        </>
    );
}
