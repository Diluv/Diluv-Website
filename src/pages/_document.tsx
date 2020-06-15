import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {

    render() {

        return (
            <Html>
                <Head lang={"en"}/>
                <body className={`min-h-100vh`}>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;