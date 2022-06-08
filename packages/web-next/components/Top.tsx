import styles from '../styles/Top.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Wechat, UploadOne } from '@icon-park/react'
import styled from 'styled-components'

type NavItem = {
  path: string
  label: string
}
const navList: NavItem[] = [
  {
    path: '/',
    label: '首页'
  },
  {
    path: '/find',
    label: '发现'
  }
]

type LinkProps = {
  href: string
  children: string
}

const Top = () => {
  const router = useRouter()
  const handleGotoHome = () => {
    router.push({
      pathname: '/'
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <ul className={styles.nav}>
          <li>
            <h1 className={styles.logo} onClick={handleGotoHome}>
              <img src="/images/logo.png" />
            </h1>
          </li>
          {navList.map((item, index) => (
            <li
              key={index}
              className={router.pathname === item.path ? styles.active : ''}
            >
              <Link passHref href={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={styles.user}>
          <li>
            <div className={`${styles.btn} ${styles.wechat}`}>
              {/* <home-popper arrow placement="bottom">
                  <div className="find-header-wechat-title">
                    <wechat theme="outline" size="16" fill="#999" />
                    <span className="text">关注公众号</span>
                  </div>
                  <template #content>
                    <div className="find-header-wechat-popper-content">
                      <img src="../assets/images/wechat.png" />
                    </div>
                  </template>
                </home-popper> */}
            </div>
          </li>
          <li>
            <div className={`${styles.btn} ${styles.recommend}`}>
              <UploadOne theme="outline" size="14" fill="#808080" />
              <span className="text">推荐</span>
            </div>
          </li>
          <li>{/* <header-avatar /> */}</li>
        </ul>
      </div>
    </div>
  )
}

export default Top
