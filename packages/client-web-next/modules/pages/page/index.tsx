import { createRef, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Info, PersonalPrivacy, Connect, Help } from '@icon-park/react';
import { wrapper } from '@/modules/store';
import Top from '@/modules/components/Top';
import Footer from '@/modules/components/Footer';
import { getParamsByContext } from '@/modules/utils';
import styles from './Page.module.scss';
import { configure, useConfigureQuery } from '@/modules/services/configureApi';
import { Viewer } from '@bytemd/react';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm';
import highlightSsr from '@bytemd/plugin-highlight-ssr';
import mathSsr from '@bytemd/plugin-math-ssr';
import mermaid from '@bytemd/plugin-mermaid';
import { containerStyle, headerStyle } from '@/modules/utils/style';

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

type TreeNode = {
    text: string;
    level: number;
    index: number;
    children?: TreeNode[];
};

function getHTrees(container: HTMLDivElement): TreeNode[] {
    const h = container.querySelectorAll('h2,h3,h4,h5');
    const minLevels = new Set<number>([]);
    const list = Array.from(h).map((item, index) => {
        const level = Number(item.tagName.match(/[0-9]/g));
        minLevels.add(level);
        return {
            text: item.innerHTML,
            level,
            index,
        };
    });
    const minLevel = Math.min(...Array.from(minLevels));
    const maxLevel = Math.max(...Array.from(minLevels));
    const offset = -Math.min(...Array.from(minLevels));
    const result: TreeNode[] = [];
    const levels: TreeNode[] = new Array(maxLevel - minLevel).fill({
        children: result,
    });
    console.log('list', list.length);
    list.forEach(function (o) {
        levels[o.level + offset].children =
            levels[o.level + offset].children || [];

        levels[o.level + offset + 1] = o;

        (levels[o.level + offset].children as TreeNode[]).push(o);
    });

    console.log('h2', result);
    // console.log('h3', h3);
    return result;
}

const Page: NextPage<PageProps> = ({ pageName }) => {
    const { data: detail } = useConfigureQuery(pageName);
    if (!detail) {
        return null;
    }
    const ref = createRef<HTMLDivElement>();
    useEffect(() => {
        if (ref) {
            console.log('ref', ref.current);
            ref.current && getHTrees(ref.current);
        }
    }, []);
    return (
        <div className={styles.container} style={containerStyle}>
            <Head>
                <title>{detail.value} - vue.design</title>
                <meta name="description" content={detail.remark} />
            </Head>
            <header className={styles.header} style={headerStyle}>
                <Top />
            </header>
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
                <article className={styles.article}>
                    {detail && (
                        <>
                            <header className={styles.title}>
                                <h1>{detail.value}</h1>
                            </header>
                            <div className={styles.content} ref={ref}>
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
                <aside className={styles['asider-right']}>
                    <ul>
                        <li>ddd</li>
                        <li>ddd</li>
                    </ul>
                </aside>
            </section>

            <Footer />
        </div>
    );
};

export default Page;
