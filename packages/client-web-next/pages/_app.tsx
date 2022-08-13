import type { AppProps } from 'next/app';
import { wrapper } from '../app/redux/store';
import 'antd/dist/antd.css';
import '../app/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
