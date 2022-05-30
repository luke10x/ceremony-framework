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
  const [ isAndroid, setIsAndroid ] = useState(false)
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    setIsIos(iOS())
    setIsAndroid(isAndroid)
  }, [])
  
  const hackForIos = isIos
    ? `
        min-height: -webkit-fill-available;
        background: blue;
      `
    : ''

  const hackForAndroid =  isAndroid
  ? `
      height: 100vh;
      background: grey;
    `
  : ''

  const hackForRest = false && (!isIos && !isAndroid)
    ? `
      height: 100vh;
    `
    : ''
  return (<>
    <style jsx global>{`
      html {
        min-height: 100%;

      }
      body {
        margin: 0px;
        padding: 0px;

        /* min-height: -moz-available;          /* WebKit-based browsers will ignore this. */
        ${hackForIos}
        ${hackForAndroid}
        ${hackForRest}


        // height: 100vh;


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