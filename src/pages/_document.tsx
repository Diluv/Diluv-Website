import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { darkmodejs } from "utils/darkmode";

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang={"en"}>
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1"/>
                    <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png?v=1"/>
                    <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png?v=1"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1"/>
                    <link rel="manifest" href="/site.webmanifest?v=1"/>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#3da6e4"/>
                    <link rel="shortcut icon" href="/favicon.ico?v=1"/>
                    <meta name="apple-mobile-web-app-title" content="Diluv"/>
                    <meta name="application-name" content="Diluv"/>
                    <meta name="msapplication-TileColor" content="#2b5797"/>
                    <meta name="msapplication-TileImage" content="/mstile-144x144.png?v=1"/>
                    <meta name="theme-color" content="#1b4b67"/>
                    <meta
                        name="description"
                        content="Diluv is a platform for fan made gaming content such as mods and texture packs made for modders, by modders."
                    />
                </Head>
                <body className={`min-h-100vh`}>
                <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "64a45ed5ff4042c2ac41f77363936c76", "spa": true}'/>
                <script dangerouslySetInnerHTML={{ __html: darkmodejs }}/>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
