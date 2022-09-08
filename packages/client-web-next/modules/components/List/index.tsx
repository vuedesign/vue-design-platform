import Link from 'next/link';
import { useSitesQuery } from '@/modules/services/siteApi';
import Item from '@/modules/components/Item';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import styles from './List.module.scss';

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
    const { data = { list: [], pagination: { page, size }, total: 0 } } =
        useSitesQuery({ page, size, authorId });
    const routerPath = getRouterPath(pageType, uuid);
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
