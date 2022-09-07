import type { AppProps } from 'next/app';
import type { IncomingMessage } from 'http';
import App, { AppInitialProps } from 'next/app';
import { wrapper } from '@/modules/store';
import { profile } from '@/modules/services/authApi';
import { countProfile } from '@/modules/services/countApi';
import { setToken } from '@/modules/features/authSlice';
import '@/assets/styles/normalize.scss';
import 'antd/dist/antd.css';

interface CtxReq extends IncomingMessage {
    cookies?: {
        token?: string;
    };
}
class MyApp extends App<AppInitialProps> {
    public static getInitialProps = wrapper.getInitialAppProps(
        (store) => async (context) => {
            const req: CtxReq = context.ctx.req as CtxReq;
            await store.dispatch(setToken(req!.cookies!.token || ''));
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

export default wrapper.withRedux(MyApp);
