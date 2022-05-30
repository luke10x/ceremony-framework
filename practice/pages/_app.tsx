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

        min-height: 100%;
        min-height: -moz-available;          /* WebKit-based browsers will ignore this. */
        min-height: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
        min-height: fill-available;

        display: flex;
        flex-direction: column;
      }
      body #__next {
        flex: 1;
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