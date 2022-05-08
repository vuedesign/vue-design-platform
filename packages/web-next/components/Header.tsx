import { Wechat, UploadOne, SettingTwo, Power } from '@icon-park/react'
import styles from '../styles/header.module.scss'
import Top from './Top'
import Image from 'next/image'

// import FindHeader from './FindHeader.vue'
// import useGlobalStore from '@/store/global';

// const globalStore = useGlobalStore();
// globalStore.findProfile();

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <Top />
        <div className={styles.logo}>
          <img src="/images/logo.png" />
        </div>
        <div className={styles.mine}>
          <span className={styles['mine-setting']}>
            <SettingTwo theme="outline" size="16" fill="#e1e9ed" />
          </span>
          <ul className={styles['mine-sites']}></ul>
        </div>
      </div>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(/images/header_bg.png)` }}
      ></div>
    </header>
  )
}

export default Header
