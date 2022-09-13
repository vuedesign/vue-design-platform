import { ReactElement } from 'react';
import { Time, Fire, ThumbsUp } from '@icon-park/react';
import styles from './Nav.module.scss';
import { setQuery, selectCurrentQuery } from '@/modules/features/siteSlice';
import { useSelector, useDispatch } from 'react-redux';

type Item = {
    value: string;
    label: string;
    icon?: ReactElement;
};

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

const typeList: Array<Item> = [
    {
        value: 'all',
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

const Nav = () => {
    const useNavDispatch = useDispatch();
    const query = useSelector(selectCurrentQuery);
    const hanldeCheckOrderClick = (item: Item) => {
        useNavDispatch(
            setQuery({
                order: item.value,
            }),
        );
    };
    const hanldeCheckTypeClick = (item: Item) => {
        useNavDispatch(
            setQuery({
                type: item.value,
            }),
        );
    };
    return (
        <div className={styles.nav}>
            <ul className={styles.tabs}>
                {orderList.map((item) => (
                    <li
                        className={
                            item.value === query.order ? styles.active : ''
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
                            item.value === query.type ? styles.active : ''
                        }
                        data-type={item.value}
                        onClick={() => hanldeCheckTypeClick(item)}
                        key={item.value}>
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
            <div>{JSON.stringify(query)}</div>
        </div>
    );
};

export default Nav;
