import Link from 'next/link';
import { useSitesQuery, sites } from '@/modules/services/siteApi';
import { selectCurrentQuery } from '@/modules/features/siteSlice';
import { useSelector } from 'react-redux';
import Item from '@/modules/components/Item';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import styles from './List.module.scss';
import { useEffect, useState } from 'react';
import { User } from '@/modules/types/auth';

type ListProps = {
    type: string;
    user?: User;
    query: Record<string, any>;
};

const List = ({ type: pageType, user, query }: ListProps) => {
    const router = useRouter();
    const globalQuery = useSelector(selectCurrentQuery);
    const [currentQuery, setCurrentQuery] = useState(query);
    const { page, size } = currentQuery;
    const {
        data = { list: [], pagination: { page, size }, total: 0 },
        refetch,
    } = useSitesQuery(currentQuery);

    useEffect(() => {
        console.log('stiessss', globalQuery);
        setCurrentQuery(globalQuery);
        setTimeout(() => {
            refetch();
        }, 0);
    }, [globalQuery]);
    return (
        <section className={styles.container}>
            <section className={styles.main}>
                <ul className={styles.list}>
                    {data.list.map((item, index) => (
                        <li key={index}>
                            <Item {...item}></Item>
                        </li>
                    ))}
                </ul>
                {pageType === 'home' && (
                    <div className={styles.more}>
                        <Link href="/sites">
                            <a className={styles['more-link']}>发现更多</a>
                        </Link>
                    </div>
                )}
                {(pageType === 'sites' || pageType === 'user') && (
                    <div className={styles.page}>
                        <Pagination
                            current={page}
                            defaultCurrent={page}
                            defaultPageSize={size}
                            pageSize={size}
                            total={data.total}
                            onChange={(page, pageSize) => {
                                if (pageType === 'user' && user) {
                                    router.push(
                                        `/users/${user.uuid}?page=${page}`,
                                    );
                                } else if (pageType === 'sites') {
                                    router.push(`/sites?page=${page}`);
                                }
                            }}
                            itemRender={(page, type, originalElement) => {
                                if (page >= 1 && type === 'page') {
                                    let href = '';
                                    if (pageType === 'user' && user) {
                                        href = `/users/${user.uuid}?page=${page}`;
                                    } else if (pageType === 'sites') {
                                        href = `/sites?page=${page}`;
                                    }
                                    return (
                                        <Link href={href} passHref={true}>
                                            <a>{page}</a>
                                        </Link>
                                    );
                                }
                                return originalElement;
                            }}
                        />
                    </div>
                )}
            </section>
        </section>
    );
};

export default List;
