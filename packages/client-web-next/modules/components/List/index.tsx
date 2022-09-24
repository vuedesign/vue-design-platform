import Link from 'next/link';
import { useSitesQuery } from '@/modules/services/siteApi';
import { selectCurrentQuery } from '@/modules/features/siteSlice';
import { useSelector } from 'react-redux';
import Item from '@/modules/components/Item';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import styles from './List.module.scss';
import { useEffect, useState, ReactNode } from 'react';
import { User } from '@/modules/types/auth';

type PageType = 'home' | 'user' | 'sites';
type ListPropsQuery = {
    size: number;
    page: number;
    order?: string;
    type?: string;
};
type ListProps = {
    pageType: PageType;
    user?: User;
    query?: ListPropsQuery;
    total?: number;
};

const MoreLink = () => (
    <div className={styles.more}>
        <Link href="/sites">
            <a className={styles['more-link']}>发现更多</a>
        </Link>
    </div>
);

/**
 * 分页
 * @param param0
 * @returns
 */
const Paginations = ({ pageType, user, query, total }: ListProps) => {
    const router = useRouter();
    const { page = 1, size = 20 } = query || {};
    return (
        <div className={styles.page}>
            <Pagination
                current={page}
                defaultCurrent={page}
                defaultPageSize={size}
                pageSize={size}
                total={total}
                onChange={(page: number) => {
                    if (pageType === 'user' && user) {
                        router.push(`/users/${user.uuid}?page=${page}`);
                    } else if (pageType === 'sites') {
                        router.push(`/sites?page=${page}`);
                    }
                }}
                itemRender={(
                    page: number,
                    type: string,
                    originalElement: ReactNode,
                ) => {
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
    );
};

const List = ({ pageType, user, query }: ListProps) => {
    const router = useRouter();
    const page = Number(router.query.page || 1);
    const size = Number(router.query.size || 20);
    const [currentQuery, setCurrentQuery] = useState({
        ...query,
        page,
        size,
    });
    const globalQuery = useSelector(selectCurrentQuery);
    const {
        data = { list: [], pagination: { page, size }, total: 0 },
        refetch,
    } = useSitesQuery(currentQuery);

    useEffect(() => {
        setCurrentQuery({
            ...currentQuery,
            ...globalQuery,
            page,
            size,
        });
    }, [globalQuery, page, size]);

    useEffect(() => {
        refetch();
    }, [currentQuery]);
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
                {pageType === 'home' && <MoreLink />}
                {(pageType === 'sites' || pageType === 'user') && (
                    <Paginations
                        pageType={pageType}
                        user={user}
                        total={data.total}
                        query={query}
                    />
                )}
            </section>
        </section>
    );
};

export default List;
