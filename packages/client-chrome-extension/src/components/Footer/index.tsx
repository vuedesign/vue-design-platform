import styles from './Footer.module.scss';
import logoImage from '@/assets/images/logo.png';
import { useConfiguresQuery } from '@/globals/services/configureApi';

type PropItem = Record<string, string>;
const Footer = () => {
    const { data } = useConfiguresQuery();
    if (!data) {
        return null;
    }
    const icp = data.icp as PropItem;
    const FOOTER_HUB = data.FOOTER_HUB as PropItem[];
    const FOOTER_NAV = data.FOOTER_NAV as PropItem[];
    return (
        <footer id="footer" className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.about}>
                    <div className={styles.logo}>
                        <a href={'#'}>
                            <img
                                src={logoImage}
                                alt=""
                                width={224}
                                height={38}
                            />
                        </a>
                    </div>
                    <div className={styles['about-right']}>
                        {FOOTER_NAV && (
                            <ul className={styles.nav}>
                                {FOOTER_NAV.map((item, index) => (
                                    <li key={index}>
                                        <a href={item.link || '#'}>
                                            {item.value}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {icp && (
                            <div className={styles.copyright}>
                                <a href={icp.link || '#'}>{icp.value}</a>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.open}>
                    <dl>
                        <dt>
                            <a
                                target={'_blank'}
                                className={styles.github}
                                href={
                                    'https://github.com/vuedesign/vue-design-platform'
                                }></a>
                        </dt>
                        {FOOTER_HUB &&
                            FOOTER_HUB.map((item, index) => {
                                return (
                                    <dd key={index}>
                                        {index > 0 && (
                                            <span className={styles.dot}></span>
                                        )}
                                        <a href={item.link || '#'}>
                                            {item.value}
                                        </a>
                                    </dd>
                                );
                            })}
                    </dl>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
