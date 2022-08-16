import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import { wrapper } from '@/globals/redux/store';
import '@/assets/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
