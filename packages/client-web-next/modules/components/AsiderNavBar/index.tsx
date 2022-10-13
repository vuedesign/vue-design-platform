import { useState, useEffect, RefObject } from 'react';
import styles from './AsiderNavBar.module.scss';

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
    return toTree(list);
}

function getAsiderStyle(container: HTMLDivElement) {
    console.log('container', container.offsetLeft, container.offsetWidth);
    return {
        marginLeft: `${container.offsetLeft + container.offsetWidth - 32}px`,
    };
}

const TreeItem = ({ list }: { list: TreeNode[] }) => {
    return (
        <ul>
            {list.map((item, index) => {
                return (
                    <li key={index}>
                        <h5>{item.text}</h5>
                        {item.children && item.children.length && (
                            <TreeItem list={item.children} />
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
const AsiderNavBar = ({ contentRef }: AsiderNavBarProps) => {
    const [tree, setTree] = useState<TreeNode[]>([]);
    const [style, setStyle] = useState<Record<string, string>>({});
    useEffect(() => {
        if (contentRef && contentRef.current) {
            const treeData = getHTrees(contentRef.current);
            const asiderStyle = getAsiderStyle(contentRef.current);
            console.log('tree data: ', treeData);
            console.log('tree left: ', asiderStyle);
            setTree(treeData);
            setStyle(asiderStyle);
        }
    }, []);
    return (
        <aside className={styles.container} style={style}>
            <TreeItem list={tree} />
        </aside>
    );
};

export default AsiderNavBar;
