import Link from 'next/link';
import { useSitesQuery } from '@/modules/services/siteApi';
import { setQuery, selectCurrentQuery } from '@/modules/features/siteSlice';
import { useSelector, useDispatch } from 'react-redux';
import Item from '@/modules/components/Item';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import styles from './List.module.scss';
import { useEffect, useState } from 'react';

type ListProps = {
    type: string;
    authorId?: number;
    uuid?: string;
};

const getRouterPath = (pageType: string, uuid: string | undefined) => {
    return (page: number): string => {
        const pageRoutes = new Map([
            ['sites', `/sites?page=${page}`],
            ['user', `/users/${uuid}?page=${page}`],
            ['profile', `/profile?page=${page}`],
        ]);
        return pageRoutes.get(pageType) || `/sites?page=${page}`;
    };
};

const List = ({ type: pageType, authorId, uuid }: ListProps) => {
    const router = useRouter();
    const page = Number(router.query.page || 1);
    const size = Number(router.query.size || 20);
    const [siteQuery, setSiteQuery] = useState({
        authorId,
        page,
        size,
        type: 'all',
        order: 'new',
    });
    const query = useSelector(selectCurrentQuery);

    const {
        data = { list: [], pagination: { page, size }, total: 0 },
        refetch,
    } = useSitesQuery(siteQuery);
    const routerPath = getRouterPath(pageType, uuid);

    useEffect(() => {
        console.log('query', query);
        setSiteQuery(Object.assign(siteQuery, query));
        refetch();
    }, [query]);
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
                                router.push(routerPath(page));
                            }}
                            itemRender={(page, type, originalElement) => {
                                if (page >= 1 && type === 'page') {
                                    return (
                                        <Link
                                            href={routerPath(page)}
                                            passHref={true}>
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
