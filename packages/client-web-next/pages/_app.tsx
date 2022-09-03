import type { AppProps } from 'next/app';
import type { IncomingMessage } from 'http';
import App, { AppInitialProps } from 'next/app';
import { wrapper } from '@/modules/redux/store';
import '@/assets/styles/normalize.scss';
import 'antd/dist/antd.css';
import { profile } from '@/modules/redux/services/authApi';
import { countProfile } from '@/modules/redux/services/countApi';
import { setToken } from '@/modules/redux/features/authSlice';

interface CtxReq extends IncomingMessage {
  cookies: {
    token: string;
  };
}
class MyApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps(
    (store) => async (context) => {
      const req: CtxReq = context.ctx.req as CtxReq;
      await store.dispatch(setToken(req.cookies.token || ''));
      await store.dispatch(profile.initiate());
      await store.dispatch(countProfile.initiate());
      // 1. Wait for all page actions to dispatch
      const pageProps = {
        // https://nextjs.org/docs/advanced-features/custom-app#caveats
        ...(await App.getInitialProps(context)).pageProps,
      };
      return { pageProps };
    },
  );

  public render() {
    const { Component, pageProps }: AppProps = this.props;
    return <Component {...pageProps} />;
  }
}

// MyApp.getInitialProps = wrapper.getInitialAppProps(
//   (store) => async (context) => {
//     await store.dispatch(profile.initiate());
//     await store.dispatch(countProfile.initiate());
//     console.log('getInitialProps context:', context);
//     // const props = await MyApp.getInitialProps(context);
//     // console.log('props', props);
//     return {
//       pageProps: {
//         // ...(await MyApp.getInitialProps(context)).pageProps,
//       },
//     };
//   },
// );

export default wrapper.withRedux(MyApp);
