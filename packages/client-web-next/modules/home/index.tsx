import Head from 'next/head';
import type { NextPage } from 'next';
import { wrapper } from '@/globals/store';
import { sites } from '@/globals/services/siteApi';
import { navigations } from '@/globals/services/navigationApi';
import { setQuery } from '@/globals/features/siteSlice';
import HomeHeader from '@/components/HomeHeader';
import List from '@/components/List';
import Bottom from '@/components/Bottom';
import Footer from '@/components/Footer';
import styles from './Home.module.scss';

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const params = {
            page: 1,
            size: 20,
        };
        await store.dispatch(navigations.initiate());
        await store.dispatch(sites.initiate(params));
        await store.dispatch(setQuery(params));
        return {
            props: {
                params,
            },
        };
    },
);

type HomeProps = {
    params: {
        page: number;
        size: number;
    };
};

const Home: NextPage<HomeProps> = ({ params }: HomeProps) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>{'首页 - vue.design'}</title>
                <meta
                    name="description"
                    content="一个能一键分享前端资源（网站、代码、工具、文章）、发现前端资源的导航平台。"
                />
            </Head>
            <HomeHeader />
            <List pageType="home" params={params} />
            <Bottom />
            <Footer />
        </div>
    );
};

export default Home;
