import type { AppProps } from 'next/app';
import type { IncomingMessage } from 'http';
import App from 'next/app';
import { wrapper } from '@/modules/store';
import { profile } from '@/modules/services/authApi';
import { countProfile } from '@/modules/services/countApi';
import { setToken } from '@/modules/features/authSlice';
import '@/assets/styles/normalize.scss';
import 'antd/dist/antd.css';
import { selectIsLoginOpen, setOpen } from '@/modules/features/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import LoginPanel from '@/modules/components/LoginPanel';

interface CtxReq extends IncomingMessage {
    cookies?: {
        token?: string;
    };
}

const MyApp = ({ Component, pageProps }: AppProps) => {
    const isLoginOpen = useSelector(selectIsLoginOpen);
    const dispatch = useDispatch();
    return (
        <>
            <Component {...pageProps} />;
            <Modal
                open={isLoginOpen}
                onCancel={() => dispatch(setOpen(false))}
                footer={null}>
                <LoginPanel finish={() => dispatch(setOpen(false))} />
            </Modal>
        </>
    );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
    (store) => async (context) => {
        const req: CtxReq = context.ctx.req as CtxReq;
        console.log('req?.cookies?.token', req?.cookies?.token);
        await store.dispatch(setToken(req?.cookies?.token || ''));
        await store.dispatch(profile.initiate());
        await store.dispatch(countProfile.initiate());
        const appProps = await App.getInitialProps(context);
        console.log('appProps', appProps);
        return { ...appProps };
    },
);

export default wrapper.withRedux(MyApp);
