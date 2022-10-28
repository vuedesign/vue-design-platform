import ModalAuth from '@/components/ModalAuth';
import ModalSetting from '@/components/ModalSetting';
import Head from 'next/head';
import { FC } from 'react';

const Global: FC = () => {
    return (
        <>
            <Head>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/vuedesign_16.png"></link>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/vuedesign_32.png"></link>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="48x48"
                    href="/favicon/vuedesign_48.png"></link>
            </Head>
            <ModalAuth />
            <ModalSetting />
        </>
    );
};

export default Global;
