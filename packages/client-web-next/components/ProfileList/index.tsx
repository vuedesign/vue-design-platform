import Link from 'next/link';
import { useRouter } from 'next/router';
import { Pagination } from 'antd';
import { useSitesQuery } from '@/globals/services/authApi';
import Item from '@/components/Item';
import styles from './ProfileList.module.scss';
import { ReactNode } from 'react';

const ProfileList = () => {
    const router = useRouter();
    const page = Number(router.query.page || 1);
    const size = Number(router.query.size || 20);
    const { data = { list: [], pagination: { page, size }, total: 0 } } =
        useSitesQuery({ page, size });
    return (
        <section className={styles.container}>
            <section className={styles.main}>
                <ul className={styles.list}>
                    {data &&
                        data.list &&
                        data.list.map((item, index) => (
                            <li key={index}>
                                <Item {...item}></Item>
                            </li>
                        ))}
                </ul>
                <div className={styles.page}>
                    {data && (
                        <Pagination
                            current={page}
                            defaultCurrent={page}
                            defaultPageSize={size}
                            pageSize={size}
                            total={data.total}
                            onChange={(page: number, pageSize: number) => {
                                router.push(`/profile?page=${page}`);
                            }}
                            itemRender={(
                                page: number,
                                type: string,
                                originalElement: ReactNode,
                            ) => {
                                if (page >= 1 && type === 'page') {
                                    return (
                                        <Link
                                            href={`/profile?page=${page}`}
                                            passHref={true}>
                                            <a>{page}</a>
                                        </Link>
                                    );
                                }
                                return originalElement;
                            }}
                        />
                    )}
                </div>
            </section>
        </section>
    );
};

export default ProfileList;
