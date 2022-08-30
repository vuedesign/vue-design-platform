import type { AppProps } from 'next/app';
import { wrapper } from '@/modules/redux/store';
import '@/assets/styles/normalize.scss';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
