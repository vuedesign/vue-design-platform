import { useContext } from 'react';
import Link from 'next/link';
import styles from '../styles/List.module.scss';
import { useSitesQuery } from '../redux/services/siteApi';
import { Pagination } from './Pagination';
import Item from './Item';

type ListProps = {
  type: string;
  page: number;
  size: number;
  total: number;
};

const More = ({ type, size, total, page }: ListProps) => {
  //   const { total, query, setQuery } = useContext(SiteListContext);
  const handlePageChange = (page: number) => {
    // setQuery(
    //   Object.assign({}, query, {
    //     page,
    //   })
    // );
  };
  const handleSizeChange = (size: number) => {
    // setQuery(
    //   Object.assign({}, query, {
    //     size,
    //   })
    // );
  };
  if (type === 'home') {
    return (
      <Link href="/site">
        <a className={styles.more}>发现更多</a>
      </Link>
    );
  }
  return (
    <Pagination
      total={total}
      page={page}
      size={size}
      onPage={handlePageChange}
      onSize={handleSizeChange}
    />
  );
};

const List = ({ type }: ListProps) => {
  const { data } = useSitesQuery({});
  const list = data?.list || [];
  const { size = 20, page = 1 } = data?.pagination || {};
  const total = data?.total || 0;
  return (
    <section className={styles.container}>
      <section className={styles.main}>
        <ul className={styles.list}>
          {list.map((item, index) => (
            <li key={index}>
              <Item {...item}></Item>
            </li>
          ))}
        </ul>
        <More type={type} total={total} size={size} page={page} />
      </section>
    </section>
  );
};

export default List;
