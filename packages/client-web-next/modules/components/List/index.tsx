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

const List = ({ type: pageType, authorId, uuid }: ListProps) => {
    const router = useRouter();
    const page = Number(router.query.page || 1);
    const size = Number(router.query.size || 20);
    const { data = { list: [], pagination: { page, size }, total: 0 } } =
        useSitesQuery({ page, size, authorId });
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
                                switch (pageType) {
                                    case 'sites':
                                        router.push(`/sites?page=${page}`);
                                        break;
                                    case 'user':
                                        router.push(
                                            `/users/${uuid}?page=${page}`,
                                        );
                                        break;
                                }
                            }}
                            itemRender={(page, type, originalElement) => {
                                if (page >= 1 && type === 'page') {
                                    switch (pageType) {
                                        case 'sites':
                                            return (
                                                <Link
                                                    href={`/sites?page=${page}`}
                                                    passHref={true}>
                                                    <a>{page}</a>
                                                </Link>
                                            );
                                            break;
                                        case 'user':
                                            return (
                                                <Link
                                                    href={`/users/${uuid}?page=${page}`}
                                                    passHref={true}>
                                                    <a>{page}</a>
                                                </Link>
                                            );
                                            break;
                                    }
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
