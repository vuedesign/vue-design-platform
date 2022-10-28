import Top from '../Top';
import { useNavigationsQuery } from '@/globals/services/navigationApi';
import styles from './HomeHeader.module.scss';
import headerBg from '@/assets/images/header_bg.png';

const HomeHeader = () => {
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
                                    <a
                                        href={item.siteUrl}
                                        target="_blank"
                                        rel="noreferrer">
                                        <dl>
                                            <dt>
                                                <span
                                                    style={{
                                                        backgroundImage: `url(${item.iconUrl})`,
                                                    }}></span>
                                            </dt>
                                            <dd>
                                                <h4>{item.title}</h4>
                                                <p>{item.description}</p>
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
                style={{
                    backgroundImage: `url(${headerBg})`,
                }}></div>
        </header>
    );
};

export default HomeHeader;
