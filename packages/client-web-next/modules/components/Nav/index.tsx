import { useState, ReactElement } from 'react';
import { Time, Fire, ThumbsUp } from '@icon-park/react';
import styles from './Nav.module.scss';

type Item = {
    value: string;
    label: string;
    icon?: ReactElement;
};

const typeList: Array<Item> = [
    {
        value: '',
        label: '全部',
    },
    {
        value: 'site',
        label: '网站',
    },
    {
        value: 'code',
        label: '代码',
    },
];

const orderList: Array<Item> = [
    {
        value: 'new',
        label: '最新',
        icon: <Time theme="outline" size="16" />,
    },
    {
        value: 'hot',
        label: '最热',
        icon: <Fire theme="outline" size="16" />,
    },
    {
        value: 'ai',
        label: '推荐',
        icon: <ThumbsUp theme="outline" size="16" />,
    },
];

const Nav = () => {
    const [orderActive, setOrderActive] = useState('new');
    const hanldeCheckOrderClick = (item: Item) => {
        setOrderActive(item.value);
    };

    const [typeActive, setTypeActive] = useState('all');
    const hanldeCheckTypeClick = (item: Item) => {
        setTypeActive(item.value);
    };

    return (
        <div className={styles.nav}>
            <ul className={styles.tabs}>
                {orderList.map((item) => (
                    <li
                        className={
                            item.value === orderActive ? styles.active : ''
                        }
                        data-type={item.value}
                        onClick={() => hanldeCheckOrderClick(item)}
                        key={item.value}>
                        {item.icon}
                        <span className={styles.text}>{item.label}</span>
                    </li>
                ))}
            </ul>
            <ul className={styles.tags}>
                {typeList.map((item) => (
                    <li
                        className={
                            item.value === typeActive ? styles.active : ''
                        }
                        data-type={item.value}
                        onClick={() => hanldeCheckTypeClick(item)}
                        key={item.value}>
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Nav;
