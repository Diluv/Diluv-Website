import Document, {Head, Html, Main, NextScript} from 'next/document'

class _document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps}
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel="manifest" href="/manifest.json"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default _document
