import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <style>
          {`
            html {
              min-height: 100%;
              display: flex;
              flex-direction: column;
            }

            body {
              margin: 0px;
              padding: 0px;

              background: tomato;

              flex: 1 0 auto;
              display: flex;
              flex-direction: column;
            }

            #__next {
              background: cyan;

              
              // this is mostly for android;
              // without it android also look weird;
              // but in a different way.
              min-height: 100vh;

              flex: 1 0 auto;
              display: flex;
              flex-direction: column;
            }
          `}
        </style>
        <link 
          href='https://fonts.googleapis.com/css?family=Dekko&display=optional'
          rel='stylesheet' />
      </Head>
      <body className="document-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
