import BaseDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends BaseDocument {
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
