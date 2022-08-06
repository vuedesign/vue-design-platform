import { SettingTwo } from '@icon-park/react';
import styles from '../styles/Header.module.scss';
import Top from './Top';
import Image from 'next/image';
import logoImage from '../public/images/logo.png';
import { useNavigationsQuery } from '../../globals/apis';

const Header = () => {
  const { data } = useNavigationsQuery();
  const list = data?.list || [];
  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <Top />
        <div className={styles.mine}>
          <ul className={styles['mine-sites']}>
            {list.map((item) => {
              return (
                <li key={item.id}>
                  <a href={item.siteUrl} target="_blank" rel="noreferrer">
                    <dl>
                      <dt>
                        {/* <img src={item.iconUrl} alt={'test'} /> */}
                        <Image
                          src={item.iconUrl}
                          alt={''}
                          width={48}
                          height={48}
                        />
                      </dt>
                      <dd>
                        <h4>{item.title}</h4>
                        {/* <p>{item.description}</p> */}
                      </dd>
                    </dl>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(/images/header_bg.png)` }}
      ></div>
    </header>
  );
};

export default Header;
