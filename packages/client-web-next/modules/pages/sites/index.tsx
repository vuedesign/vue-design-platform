import type { NextPage } from 'next';
import Head from 'next/head';
import List from '@/modules/components/List';
import Top from '@/modules/components/Top';
import Footer from '@/modules/components/Footer';
import Nav from '@/modules/components/Nav';
import { wrapper } from '@/modules/store';
import { sites } from '@/modules/services/siteApi';
import styles from './Sites.module.scss';
import { setQuery } from '@/modules/features/siteSlice';
import { containerStyle, headerStyle } from '@/modules/utils/style';

type SitesPropsQuery = {
    order: string;
    type: string;
    page: number;
    size: number;
};
type SitesProps = {
    params: SitesPropsQuery;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const params: SitesPropsQuery = {
            order: String(context.query.order || 'new'),
            type: String(context.query.type || 'all'),
            page: Number(context.query.page || 1),
            size: Number(context.query.size || 20),
        };
        await store.dispatch(setQuery(params));
        await store.dispatch(sites.initiate(params));
        return {
            props: {
                params,
            },
        };
    },
);

const Sites: NextPage<SitesProps> = ({ params }: SitesProps) => {
    return (
        <div className={styles.container} style={containerStyle}>
            <Head>
                <title>发现 - vue.design</title>
                <meta
                    name="description"
                    content="一个能一键分享前端资源（网站、代码、工具、文章）、发现前端资源的导航平台。"
                />
            </Head>
            <header className={styles.header} style={headerStyle}>
                <Top />
            </header>
            <section className={styles.main}>
                <Nav />
            </section>
            <List pageType="sites" params={params} />
            <Footer />
        </div>
    );
};

export default Sites;
