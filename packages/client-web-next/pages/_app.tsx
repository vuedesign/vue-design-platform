import type { AppProps } from 'next/app';
import type { IncomingMessage } from 'http';
import App, { AppInitialProps } from 'next/app';
import { wrapper } from '@/modules/store';
import { profile } from '@/modules/services/authApi';
import { countProfile } from '@/modules/services/countApi';
import { setToken } from '@/modules/features/authSlice';
import '@/assets/styles/normalize.scss';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';

interface CtxReq extends IncomingMessage {
    cookies?: {
        token?: string;
    };
}

const MyApp = ({ Component, pageProps }: AppProps) => {
    // const { store, props } = wrapper.useWrappedStore(pageProps);
    return <Component {...pageProps} />;
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
    (store) => async (context) => {
        const req: CtxReq = context.ctx.req as CtxReq;
        await store.dispatch(setToken(req?.cookies?.token || ''));
        await store.dispatch(profile.initiate());
        await store.dispatch(countProfile.initiate());
        const appProps = await App.getInitialProps(context);
        console.log('appProps', appProps);
        return { ...appProps };
    },
);

export default wrapper.withRedux(MyApp);
