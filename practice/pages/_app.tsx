import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../app/store';

function MyApp({
  Component, pageProps,
}: AppProps) {
  return (<>
    <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;

        min-height: 100vh;
        min-height: -moz-available;          /* WebKit-based browsers will ignore this. */
        min-height: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */

      
        display: flex;
        flex-direction: column;
      }

      /* for landscape view: */
      @media (min-aspect-ratio: 1/1) {
        body {
          min-height: 100vh;
        }
      }

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