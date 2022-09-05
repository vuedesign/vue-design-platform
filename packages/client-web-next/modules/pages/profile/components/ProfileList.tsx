import Link from 'next/link';
import styles from '@/modules/styles/List.module.scss';
import { useSitesQuery } from '@/modules/redux/services/authApi';
import Item from '@/modules/components/Item';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';

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
          {data.list.map((item, index) => (
            <li key={index}>
              <Item {...item}></Item>
            </li>
          ))}
        </ul>
        <div className={styles.page}>
          <Pagination
            current={page}
            defaultCurrent={page}
            defaultPageSize={size}
            pageSize={size}
            total={data.total}
            onChange={(page, pageSize) => {
              router.push(`/profile?page=${page}`);
            }}
            itemRender={(page, type, originalElement) => {
              if (page >= 1 && type === 'page') {
                return (
                  <Link href={`/profile?page=${page}`} passHref={true}>
                    <a>{page}</a>
                  </Link>
                );
              }
              return originalElement;
            }}
          />
        </div>
      </section>
    </section>
  );
};

export default ProfileList;