import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from "react";

class MyDocument extends Document {

  render() {

    return (
      <Html>
        <Head/>
        <script src="noflash.js"/>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;