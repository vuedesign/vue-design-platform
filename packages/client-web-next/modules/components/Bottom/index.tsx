import styles from './Bottom.module.scss';
import { RankingList, TagOne, Help, ShareSys } from '@icon-park/react';
import Link from 'next/link';

const Bottom = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <dl className={styles.author}>
                    <dt>
                        <RankingList theme="outline" size="24" />
                        <span className={styles.title}>作者排行榜</span>
                    </dt>
                    <dd></dd>
                </dl>
                <dl className={styles.tags}>
                    <dt>
                        <TagOne theme="outline" size="24" />
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
            </div>
        </div>
    );
};

export default Bottom;
