import { useState, useEffect, RefObject, createRef } from 'react';
import styles from './AsiderNavBar.module.scss';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import { isClient } from '@/modules/utils';
import { throttle } from 'lodash-es';

type TreeNode = {
    text: string;
    hLevel: number;
    level: number;
    index: number;
    children?: TreeNode[];
};

function setHKey(h: NodeListOf<Element>) {
    h.forEach((item, key) => {
        item.setAttribute('data-key', `h-${key}`);
    });
}

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

function getHTrees(container: HTMLDivElement | null): TreeNode[] {
    if (!container) {
        return [];
    }
    const h = container.querySelectorAll('h1,h2,h3,h4,h5,h6');
    setHKey(h);
    const list = Array.from(h).map((item, index) => {
        const hLevel = Number(item.tagName.match(/[0-9]/g));
        return {
            text: item.innerHTML,
            hLevel,
            level: 0,
            index,
        };
    });
    return toTree(list);
}

const TreeItem = ({
    list,
    activeClass,
}: {
    list: TreeNode[];
    activeClass: string;
}) => {
    return (
        <ul>
            {list.map((item, index) => {
                return (
                    <li key={index}>
                        <h5
                            data-nav-key={`h-${item.index}`}
                            className={
                                activeClass === `h-${item.index}`
                                    ? styles.active
                                    : undefined
                            }>
                            <Link href={`#h-${item.index}`}>{item.text}</Link>
                        </h5>
                        {item.children && item.children.length && (
                            <TreeItem
                                list={item.children}
                                activeClass={activeClass}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

type AsiderNavBarProps = {
    contentRef: RefObject<HTMLDivElement>;
};

function getCurrentHKey(contentRef: RefObject<HTMLDivElement>) {
    if (!contentRef.current) {
        return '';
    }
    const currentHList =
        contentRef.current.querySelectorAll(`h1,h2,h3,h4,h5,h6`);

    let currentH: Element | undefined;
    currentHList.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (
            rect.top > 60 &&
            rect.top < document.body.clientHeight - 60 &&
            !currentH
        ) {
            currentH = item;
        }
    });
    if (!currentH) {
        return '';
    }
    return currentH.getAttribute(`data-key`) || '';
}

function getStyle(current: HTMLDivElement) {
    if (!current) {
        return {
            display: 'none',
            height: '0px',
            marginLeft: '0px',
        };
    }
    const { offsetLeft, offsetWidth } = current;
    return {
        display: 'block',
        height: `${window.innerHeight - 64}px`,
        marginLeft: `${offsetLeft + offsetWidth - 16}px`,
    };
}

const gotoMiddle = (navBarRef: RefObject<HTMLDivElement>, key: string) => {
    if (!navBarRef.current || !key) {
        return;
    }
    const currentItem = navBarRef.current.querySelector(
        `[data-nav-key=${key}]`,
    );
    if (currentItem) {
        const { top: currentItemTop } = currentItem.getBoundingClientRect();
        const { top: navBarTop } = navBarRef.current.getBoundingClientRect();
        const middle =
            currentItemTop - navBarTop - navBarRef.current.clientHeight / 2;
        navBarRef.current.scrollTop = navBarRef.current.scrollTop + middle;
    }
};

const useGotoH = (
    router: NextRouter,
    contentRef: RefObject<HTMLDivElement>,
) => {
    useEffect(() => {
        const [, hKey] = router.asPath.split('#');
        if (!hKey || !contentRef.current) {
            return;
        }
        const currentH = contentRef.current.querySelector(`[data-key=${hKey}]`);
        if (!currentH) {
            return;
        }
        const rect = currentH.getBoundingClientRect();
        const scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (isClient) {
            document.body.scrollTop = document.documentElement.scrollTop =
                scrollTop + rect.top - 64;
        }
    }, [router]);
};

const AsiderNavBar = ({ contentRef }: AsiderNavBarProps) => {
    const router = useRouter();
    const navBarRef = createRef<HTMLDivElement>();
    const [style, setStyle] = useState<Record<string, string>>({});
    const [activeClass, setActiveClass] = useState('');
    const [tree, setTree] = useState<TreeNode[]>([]);
    useGotoH(router, contentRef);

    const handleScroll = (evt: Event) => {
        const navBarStyle = (() => {
            const footer = document.getElementById('footer');
            if (!footer) {
                return style;
            }
            const { top } = footer.getBoundingClientRect();
            const bottomHeight =
                window.innerHeight - top > 0 ? window.innerHeight - top : 0;
            return Object.assign({}, style, {
                height: `${window.innerHeight - 64 - bottomHeight}px`,
            });
        })();

        setStyle(navBarStyle);
        const key = getCurrentHKey(contentRef);
        setActiveClass(key);
        gotoMiddle(navBarRef, key);
    };

    useEffect(() => {
        if (!contentRef.current) {
            return;
        }
        setTree(getHTrees(contentRef.current));
        setStyle(getStyle(contentRef.current));
        setActiveClass(getCurrentHKey(contentRef));
    }, [contentRef.current]);

    if (isClient) {
        window.addEventListener('scroll', handleScroll);
    }

    return (
        <aside className={styles.container} style={style}>
            <header className={styles.header}>
                <h4>目录</h4>
            </header>
            <section className={styles.content} ref={navBarRef}>
                <TreeItem list={tree} activeClass={activeClass} />
            </section>
        </aside>
    );
};

export default AsiderNavBar;
