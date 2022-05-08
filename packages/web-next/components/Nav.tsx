import styles from '../styles/Nav.module.scss'

const Nav = () => {
  return (
    <div className={styles.nav}>
      <ul className={styles.tabs}>
        <li className="active">
          <span>最新</span>
        </li>
        <li>
          <span>推荐</span>
        </li>
      </ul>
      <ul className={styles.tags}>
        <li className="active">
          <span>全部</span>
        </li>
        <li>
          <span>网站</span>
        </li>
        <li>
          <span>代码</span>
        </li>
      </ul>
    </div>
  )
}

export default Nav
