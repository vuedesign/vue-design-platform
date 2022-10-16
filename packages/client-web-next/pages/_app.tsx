import type { AppProps } from 'next/app';
import type { IncomingMessage } from 'http';
import App from 'next/app';
import { wrapper } from '@/globals/store';
import { profile } from '@/globals/services/authApi';
import { countProfile } from '@/globals/services/countApi';
import { setToken } from '@/globals/features/authSlice';
import { setCookie } from '@/globals/features/globalSlice';
import Global from '@/components/Global';
import '@/assets/styles/normalize.scss';
import 'antd/dist/antd.css';
import 'highlight.js/styles/vs.css';
import 'github-markdown-css';

interface CtxReq extends IncomingMessage {
    cookies?: {
        token?: string;
    };
}

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Component {...pageProps} />
            <Global />
        </>
    );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
    (store) => async (context) => {
        const req: CtxReq = context.ctx.req as CtxReq;
        await store.dispatch(setCookie(req?.headers?.cookie || null));
        await store.dispatch(setToken(req?.cookies?.token || ''));
        await store.dispatch(profile.initiate());
        await store.dispatch(countProfile.initiate());
        const appProps = await App.getInitialProps(context);
        return { ...appProps };
    },
);

export default wrapper.withRedux(MyApp);
