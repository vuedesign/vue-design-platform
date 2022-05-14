import styles from '../styles/List.module.scss'
import Item from './Item'
import { SiteListContext } from '../pages/hooks/SiteListContext'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Pagination } from './Pagination'

type ListProps = {
  type: string
}

const More = ({ type }: ListProps) => {
  const { total, query, setQuery } = useContext(SiteListContext)
  const handlePageChange = (page: number) => {
    setQuery(
      Object.assign({}, query, {
        page
      })
    )
  }
  const handleSizeChange = (size: number) => {
    setQuery(
      Object.assign({}, query, {
        size
      })
    )
  }
  if (type === 'home') {
    return (
      <Link href="/find">
        <a className={styles.more}>发现更多</a>
      </Link>
    )
  }
  return (
    <Pagination
      total={total}
      page={query.page}
      size={query.size}
      onPage={handlePageChange}
      onSize={handleSizeChange}
    />
  )
}

const List = ({ type }: ListProps) => {
  const context = useContext(SiteListContext)
  const list = context.list || []
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
        <More type={type} />
      </section>
    </section>
  )
}

export default List
