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

  let hack = ''
  if (isIos) {
    hack = `
      min-height: -webkit-fill-available;
    `
  } else if (!isAndroid) {
    hack = `
      min-height: 100vh;
    `
  }

  return (<>
    <style jsx global>{`
      html {
        min-height: 100%;
        display: flex;
        flex-direction: column;
      }

      body {
        margin: 0px;
        padding: 0px;

        background: red;

        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
      }

      #__next {
        background: green;

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