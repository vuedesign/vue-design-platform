import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { wrapper } from '@/modules/store';
import { sites } from '@/modules/services/siteApi';
import { navigations } from '@/modules/services/navigationApi';
import List from '@/modules/components/List';
import Footer from '@/modules/components/Footer';
import Header from '@/modules/components/Header';
import styles from './Home.module.scss';

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        await store.dispatch(navigations.initiate());
        await store.dispatch(sites.initiate({}));
        return {
            props: {},
        };
    },
);

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}: HomeProps) => {
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
            <Header />
            <List type="home" />
            <Link href="/sites">
                <a className={styles.more}>发现更多</a>
            </Link>
            <Footer />
        </div>
    );
};

export default Home;
