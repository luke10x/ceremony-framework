import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../app/store';
import { useEffect, useState } from 'react';

const iOS = () => {
  // return true;
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
function MyApp({
  Component, pageProps,
}: AppProps) {
  const [ isIos, setIsIos ] = useState(false)
  useEffect(() => {
    setIsIos(iOS())
  }, [])
  
  const hackForIos = isIos
    ? `
      min-height: -webkit-fill-available;
      height: 100vh;
      background: red;
    ` 
    : `
      height: 100vh;
      min-height: -moz-available;
      background: yellow;
    `

  return (<>
    <style jsx global>{`
      html {
        min-height: 100%;

      }
      body {
        margin: 0px;
        padding: 0px;

        ${hackForIos}


        display: flex;
        flex-direction: column;
      }

      /* for landscape view: 
      @media (min-aspect-ratio: 1/1) {
        body {
          min-height: 100vh;
        }
      }*/

      #__next {
        height: 100%;

        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
      }
    `}</style>

    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>);
}

export default MyApp;