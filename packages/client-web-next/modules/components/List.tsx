import Link from 'next/link';
import styles from '../styles/List.module.scss';
import { useSitesQuery } from '../redux/services/siteApi';
import Item from './Item';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';

type ListProps = {
  type: string;
};

const List = ({ type }: ListProps) => {
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
        {type === 'home' ? (
          <Link href="/sites">
            <a className={styles.more}>发现更多</a>
          </Link>
        ) : (
          <div className={styles.page}>
            <Pagination
              current={page}
              defaultCurrent={page}
              defaultPageSize={size}
              pageSize={size}
              total={data.total}
              itemRender={(page, type, originalElement) => {
                if (page >= 1 && type == 'page') {
                  return (
                    <Link href={`/sites?page=${page}`} passHref={true}>
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
