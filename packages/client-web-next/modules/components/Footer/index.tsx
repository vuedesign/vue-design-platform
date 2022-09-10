import styles from './Footer.module.scss';
import { RankingList, TagOne, Help, Github } from '@icon-park/react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/public/images/logo.png';

const Footer = () => {
    return (
        <footer className={styles.container}>
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
                        <ul className={styles.nav}>
                            <li>
                                <Link href={'#'}>
                                    <a>关于我们</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    <a>使用文档</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    <a>友情链接</a>
                                </Link>
                            </li>
                        </ul>
                        <div className={styles.copyright}>
                            <Link href={'#'}>
                                <a>京ICP备18012699号-3</a>
                            </Link>
                        </div>
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
                        <dd>
                            <Link href={'#'}>
                                <a>设计文档</a>
                            </Link>
                        </dd>
                        <dd>
                            <span className={styles.dot}></span>
                        </dd>
                        <dd>
                            <Link href={'#'}>
                                <a>开发文档</a>
                            </Link>
                        </dd>
                        <dd>
                            <span className={styles.dot}></span>
                        </dd>
                        <dd>
                            <Link href={'#'}>
                                <a>版本迭代</a>
                            </Link>
                        </dd>
                    </dl>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
