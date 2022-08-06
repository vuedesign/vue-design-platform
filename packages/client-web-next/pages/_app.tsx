import type { AppProps } from 'next/app';
import { wrapper } from '../client/redux/store';
import 'antd/dist/antd.css';
import '../client/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
