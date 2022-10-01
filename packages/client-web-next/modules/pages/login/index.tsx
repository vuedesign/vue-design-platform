import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './Login.module.scss';
import LoginPanel from '@/modules/components/LoginPanel';
import { Divider } from 'antd';
import { wrapper } from '@/modules/store';
import { publicKey } from '@/modules/services/authApi';

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        return {
            props: {},
        };
    },
);

const Login: NextPage<any> = () => {
    const router = useRouter();
    const finish = () => {
        router.push('/');
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>vue.design</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <div className={styles['left-inner']}>
                            <Divider orientation="left">登录</Divider>
                            <LoginPanel finish={finish} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
