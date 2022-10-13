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
    hLevel: number;
    level: number;
    index: number;
    children?: TreeNode[];
};

function getHTrees(container: HTMLDivElement): TreeNode[] {
    const h = container.querySelectorAll('h2,h3,h4,h5');
    const list = Array.from(h).map((item, index) => {
        const hLevel = Number(item.tagName.match(/[0-9]/g));
        return {
            text: item.innerHTML,
            hLevel,
            level: 0,
            index,
        };
    });

    function toTree(flatArr: TreeNode[]) {
        const tree: TreeNode[] = [];
        const copyArr = flatArr.map((item) => {
            return item;
        });

        // 根据指定级别查找该级别的子孙级，并删除掉已经查找到的子孙级
        const getChildrenByLevel = (
            currentLevelItem: TreeNode,
            arr: TreeNode[],
            level: number,
        ) => {
            if (!currentLevelItem) {
                return [];
            }
            // 将level值转成负数，再进行比较
            const minusCurrentLevel = -currentLevelItem.hLevel;
            const children = [];
            for (let i = 0, len = arr.length; i < len; i++) {
                const levelItem = arr[i];
                if (-levelItem.hLevel < minusCurrentLevel) {
                    children.push(levelItem);
                } else {
                    // 只找最近那些子孙级
                    break;
                }
            }
            // 从数组中删除已经找到的那些子孙级，以免影响到其他子孙级的查找
            if (children.length > 0) {
                arr.splice(0, children.length);
            }
            return children;
        };

        const getTree = function (
            result: TreeNode[],
            arr: TreeNode[],
            level: number,
        ) {
            // 首先将数组第一位移除掉，并添加到结果集中
            let currentItem = arr.shift() as TreeNode;
            currentItem.level = level;
            result.push(currentItem);
            while (arr.length > 0) {
                if (!currentItem) {
                    return;
                }
                // 根据当前级别获取它的子孙级
                const children = getChildrenByLevel(currentItem, arr, level);
                // 如果当前级别没有子孙级则开始下一个
                if (children.length === 0) {
                    currentItem = arr.shift() as TreeNode;
                    currentItem.level = level;
                    if (currentItem) {
                        result.push(currentItem);
                    }
                    continue;
                }
                currentItem.children = [];
                // 查找到的子孙级继续查找子孙级
                getTree(currentItem.children, children, level + 1);
            }
        };
        getTree(tree, copyArr, 1);
        return tree;
    }

    const result = toTree(list);
    console.log('result h:', result);
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
