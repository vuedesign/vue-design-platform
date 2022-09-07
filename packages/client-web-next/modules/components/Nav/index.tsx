import { useState } from 'react';
import styles from './Nav.module.scss';

type Item = {
    value: string;
    label: string;
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
    },
    {
        value: 'hot',
        label: '最热',
    },
    {
        value: 'ai',
        label: '推荐',
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
                        <span>{item.label}</span>
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
