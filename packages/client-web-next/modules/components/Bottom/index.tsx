import styles from './Bottom.module.scss';
import { RankingList, TagOne } from '@icon-park/react';
import { useTagsQuery } from '@/modules/services/tagApi';
import Link from 'next/link';

const Bottom = () => {
    const { data: tags } = useTagsQuery();
    console.log('tags', tags);
    const tagList = tags?.list || [];
    console.log('tags', tagList);
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
                        {tagList &&
                            tagList.map((item) => (
                                <span data-id={item.id}>{item.name}</span>
                            ))}
                    </dd>
                </dl>
            </div>
        </div>
    );
};

export default Bottom;
