import { createRef, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
    Info,
    PersonalPrivacy,
    Connect,
    Help,
    SolarEnergy,
} from '@icon-park/react';
import { wrapper } from '@/globals/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getParamsByContext } from '@/globals/utils';
import styles from './Page.module.scss';
import { configure, useConfigureQuery } from '@/globals/services/configureApi';
import { Viewer } from '@bytemd/react';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm';
import highlightSsr from '@bytemd/plugin-highlight-ssr';
import mathSsr from '@bytemd/plugin-math-ssr';
import mermaid from '@bytemd/plugin-mermaid';
import { containerStyle, headerStyle } from '@/globals/utils/style';
import AsiderNavBar from '@/components/AsiderNavBar';

// 编辑插件
const plugins = [
    frontmatter(),
    gemoji(),
    gfm(),
    highlightSsr(),
    mathSsr(),
    mermaid(),
];

const leftNav = [
    {
        path: 'about',
        name: '关于我们',
        component: <Info theme="filled" size="14" />,
    },
    {
        path: 'privacy',
        name: '隐私政策',
        component: <PersonalPrivacy theme="filled" size="14" />,
    },
    {
        path: 'help',
        name: '使用文档',
        component: <Help theme="filled" size="14" />,
    },
    {
        path: 'link',
        name: '友情链接',
        component: <Connect theme="filled" size="14" />,
    },
];

type PageProps = {
    pageName: string;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const pageName = getParamsByContext<typeof context>(
            context,
            'pageName',
        );
        await store.dispatch(configure.initiate(pageName));
        return {
            props: {
                pageName,
            },
        };
    },
);

const Page: NextPage<PageProps> = ({ pageName }) => {
    const { data: detail } = useConfigureQuery(pageName);
    if (!detail) {
        return null;
    }
    const ref = createRef<HTMLDivElement>();
    return (
        <div className={styles.container} style={containerStyle}>
            <Head>
                <title>{`${detail.value} - vue.design`}</title>
                <meta name="description" content={detail.remark} />
            </Head>
            <Header headerStyle={headerStyle} />
            <section className={styles.main}>
                <aside className={styles['asider-left']}>
                    <ul>
                        {leftNav.map((item, key) => {
                            return (
                                <li
                                    key={key}
                                    className={
                                        item.path === pageName
                                            ? styles.active
                                            : undefined
                                    }>
                                    {item.component}
                                    <Link href={`/page/${item.path}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </aside>
                <article className={styles.article} ref={ref}>
                    {detail && (
                        <>
                            <header className={styles.title}>
                                <h1>{detail.value}</h1>
                            </header>
                            <div className={styles.content}>
                                {detail.content && (
                                    <Viewer
                                        value={detail.content}
                                        plugins={plugins}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </article>
                <AsiderNavBar contentRef={ref} />
            </section>

            <Footer />
        </div>
    );
};

export default Page;
