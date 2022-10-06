import type { AppProps } from 'next/app';
import type { IncomingMessage } from 'http';
import App from 'next/app';
import { wrapper } from '@/modules/store';
import { profile } from '@/modules/services/authApi';
import { countProfile } from '@/modules/services/countApi';
import { configures } from '@/modules/services/configureApi';
import { setToken } from '@/modules/features/authSlice';
import { setCookie } from '@/modules/features/globalSlice';
import '@/assets/styles/normalize.scss';
import 'antd/dist/antd.css';
import ModalAuth from '@/modules/components/ModalAuth';
import ModalSetting from '@/modules/components/ModalSetting';

interface CtxReq extends IncomingMessage {
    cookies?: {
        token?: string;
    };
}

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Component {...pageProps} />
            <ModalAuth />
            <ModalSetting />
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
        // await store.dispatch(configures.initiate());
        const appProps = await App.getInitialProps(context);
        return { ...appProps };
    },
);

export default wrapper.withRedux(MyApp);
