import type { AppProps } from 'next/app';
import type { IncomingMessage } from 'http';
import App from 'next/app';
import { wrapper } from '@/modules/store';
import { profile } from '@/modules/services/authApi';
import { countProfile } from '@/modules/services/countApi';
import { setToken, setUser } from '@/modules/features/authSlice';
import '@/assets/styles/normalize.scss';
import styles from '@/assets/styles/Login.module.scss';
import 'antd/dist/antd.css';
import { selectIsLoginOpen, setOpen } from '@/modules/features/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import LoginPanel from '@/modules/components/LoginPanel';
import { CloseSmall } from '@icon-park/react';

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
                width={360}
                closable={false}
                open={isLoginOpen}
                footer={null}>
                <header className={styles['modal-login-header']}>
                    <h5>登录</h5>
                    <span onClick={() => dispatch(setOpen(false))}>
                        <CloseSmall theme="filled" size="20" />
                    </span>
                </header>
                <LoginPanel finish={() => dispatch(setOpen(false))} />
            </Modal>
        </>
    );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
    (store) => async (context) => {
        const req: CtxReq = context.ctx.req as CtxReq;
        console.log('app token:', req?.cookies?.token);
        await store.dispatch(setToken(req?.cookies?.token || ''));
        await store.dispatch(profile.initiate());
        await store.dispatch(countProfile.initiate());
        const appProps = await App.getInitialProps(context);
        return { ...appProps };
    },
);

export default wrapper.withRedux(MyApp);
