import { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Pagination } from 'antd';
import { isClient } from '@/globals/utils';
import Item from '@/components/Item';
import { useSitesQuery } from '@/globals/services/siteApi';
import { selectLoginState } from '@/globals/features/globalSlice';
import { User } from '@/globals/types/auth';
import { stringify } from 'qs';
import styles from './List.module.scss';

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
    params?: ListPropsQuery;
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
const Paginations = ({ pageType, user, params, total }: ListProps) => {
    const router = useRouter();
    const { page = 1, size = 20 } = params || {};
    return (
        <div className={styles.page}>
            <Pagination
                current={page}
                defaultCurrent={page}
                defaultPageSize={size}
                pageSize={size}
                total={total}
                onChange={(page: number) => {
                    const queryString = stringify(
                        Object.assign({}, params, { page }),
                    );
                    if (pageType === 'user' && user) {
                        router.push(`/users/${user.uuid}?${queryString}`);
                    } else if (pageType === 'sites') {
                        router.push(`/sites?${queryString}`);
                    }
                }}
                itemRender={(
                    page: number,
                    type: string,
                    originalElement: ReactNode,
                ) => {
                    if (page >= 1 && type === 'page') {
                        const queryString = stringify(
                            Object.assign({}, params, { page }),
                        );
                        let href = '';
                        if (pageType === 'user' && user) {
                            href = `/users/${user.uuid}?${queryString}`;
                        } else if (pageType === 'sites') {
                            href = `/sites?${queryString}`;
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

const List = ({
    pageType,
    user,
    params = { size: 20, page: 1 },
}: ListProps) => {
    const { page, size } = params;
    const {
        data = { list: [], pagination: { page, size }, total: 0 },
        refetch,
    } = useSitesQuery(params);
    // 登录、退出状态更新
    const loginState = useSelector(selectLoginState);

    useEffect(() => {
        isClient && refetch();
    }, [loginState]);
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
                        params={params}
                    />
                )}
            </section>
        </section>
    );
};

export default List;
