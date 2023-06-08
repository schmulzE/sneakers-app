import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

   render() {
    return (
      <Html>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,600&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='modal'></div>
        </body>
      </Html>
    )
  }
}


export default MyDocument