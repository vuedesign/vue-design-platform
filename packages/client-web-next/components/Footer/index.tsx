import styles from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/public/images/logo.png';
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
                        <Link href={'#'}>
                            <a>
                                <Image
                                    src={logoImage}
                                    alt=""
                                    width={224}
                                    height={38}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles['about-right']}>
                        {FOOTER_NAV && (
                            <ul className={styles.nav}>
                                {FOOTER_NAV.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.link || '#'}>
                                            <a>{item.value}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {icp && (
                            <div className={styles.copyright}>
                                <Link href={icp.link || '#'}>
                                    <a>{icp.value}</a>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.open}>
                    <dl>
                        <dt>
                            <Link
                                href={
                                    'https://github.com/vuedesign/vue-design-platform'
                                }>
                                <a
                                    target={'_blank'}
                                    className={styles.github}></a>
                            </Link>
                        </dt>
                        {FOOTER_HUB &&
                            FOOTER_HUB.map((item, index) => {
                                return (
                                    <dd key={index}>
                                        {index > 0 && (
                                            <span className={styles.dot}></span>
                                        )}
                                        <Link href={item.link || '#'}>
                                            <a>{item.value}</a>
                                        </Link>
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
