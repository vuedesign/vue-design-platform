import styles from './Footer.module.scss';
import { RankingList, TagOne, Help, ShareSys } from '@icon-park/react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.inner}>
                <dl>
                    <dt>
                        <RankingList theme="outline" size="24" fill="#999" />
                        <span className={styles.title}>作者排行榜</span>
                    </dt>
                    <dd></dd>
                </dl>
                <dl className={styles.tags}>
                    <dt>
                        <TagOne theme="outline" size="24" fill="#999" />
                        <span className={styles.title}>标签云</span>
                    </dt>
                    <dd>
                        <span>掘金</span>
                        <span>稀土</span>
                        <span>Vue.js</span>
                        <span>前端面试题</span>
                        <span>Kotlin</span>
                        <span>ReactNative</span>
                        <span>Python</span>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <Help theme="outline" size="24" fill="#999" />
                        <span className={styles.title}>帮助文档</span>
                    </dt>
                    <dd>
                        <Link href={'#'}>
                            <a>使用文档</a>
                        </Link>
                    </dd>
                    <dd>
                        <Link href={'#'}>
                            <a>设计文档</a>
                        </Link>
                    </dd>
                    <dd>
                        <Link href={'#'}>
                            <a>开发文档</a>
                        </Link>
                    </dd>
                    <dd>
                        <Link href={'#'}>
                            <a>版本迭代</a>
                        </Link>
                    </dd>
                    <dd>
                        <Link
                            href={
                                'https://github.com/vuedesign/vue-design-platform'
                            }>
                            <a>vue.design开源</a>
                        </Link>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <ShareSys theme="outline" size="24" fill="#999" />
                        <span className={styles.title}>关于vue.design</span>
                    </dt>
                    <dd>
                        <Link href={'#'}>
                            <a>关于站长</a>
                        </Link>
                    </dd>
                    <dd>
                        <Link href={'#'}>
                            <a>友情链接</a>
                        </Link>
                    </dd>
                    <dd>
                        <Link href={'#'}>
                            <a>京ICP备18012699号-3</a>
                        </Link>
                    </dd>
                </dl>
            </div>
        </footer>
    );
};

export default Footer;
