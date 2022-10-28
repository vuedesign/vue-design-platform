import { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Time, Fire, ThumbsUp } from '@icon-park/react';
import { typeList, TypeItem } from '@/configs/globals.contants';
import { AppDispatch } from '@/globals/store';
import { setQuery, selectCurrentQuery } from '@/globals/features/siteSlice';
import styles from './Nav.module.scss';
import { stringify } from 'qs';

type OrderItem = {
    value: string;
    label: string;
    icon?: ReactElement;
};
const orderList: Array<OrderItem> = [
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
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector(selectCurrentQuery);
    const hanldeCheckOrderClick = (item: OrderItem) => {
        const queryString = stringify(
            Object.assign({}, query, { order: item.value, page: 1 }),
        );
        router.push(`/sites?${queryString}`);
        dispatch(
            setQuery({
                order: item.value,
                page: 1,
            }),
        );
    };
    const hanldeCheckTypeClick = (item: TypeItem) => {
        const queryString = stringify(
            Object.assign({}, query, { type: item.value, page: 1 }),
        );
        router.push(`/sites?${queryString}`);
        dispatch(
            setQuery({
                type: item.value,
                page: 1,
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
        </div>
    );
};

export default Nav;
