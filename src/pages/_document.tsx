import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from "react";

class MyDocument extends Document {

  render() {

    return (
      <Html>
        <Head/>
        <body className={`min-h-100vh`}>
        <script src="noflash.js"/>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;