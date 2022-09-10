import { Avatar } from 'antd';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import {
    ShareOne,
    PreviewOpen,
    ThumbsUp,
    ArrowCircleRight,
} from '@icon-park/react';
import { useSitesQuery } from '@/modules/services/siteApi';
import { useCountQuery } from '@/modules/services/countApi';
import Item from '@/modules/components/Item';
import { User } from '@/modules/types/auth';
import styles from './Asider.module.scss';

type AsiderProps = {
    uuid: string;
    authorId: number;
    profile: Partial<User>;
};
const Asider = ({ uuid, authorId, profile }: AsiderProps) => {
    const { data: site } = useSitesQuery({ authorId, size: 2, uuid });
    const { data: count } = useCountQuery(authorId);
    return (
        <aside className={styles.container}>
            <div className={styles.profile}>
                {profile && (
                    <div className={styles.userinfo}>
                        <dl>
                            <dt>
                                <Avatar
                                    size={48}
                                    src={profile.avatar}
                                    icon={<UserOutlined />}
                                />
                            </dt>
                            <dd>
                                <h5>{profile.username}</h5>
                                <p>
                                    <Link href={`/profile/${profile.uuid}`}>
                                        <a className={styles.link}>
                                            <span
                                                className={styles['link-text']}>
                                                个人中心
                                            </span>
                                            <ArrowCircleRight
                                                theme="outline"
                                                size="14"
                                                fill="#1890ff"
                                            />
                                        </a>
                                    </Link>
                                </p>
                            </dd>
                        </dl>
                    </div>
                )}
                {count && (
                    <ul className={styles.count}>
                        <li>
                            <ShareOne theme="outline" size="16" fill="#666" />
                            <span className={styles.text}>{count.sites}</span>
                        </li>
                        <li>
                            <ThumbsUp theme="outline" size="16" fill="#666" />
                            <span className={styles.text}>{count.top}</span>
                        </li>
                        <li>
                            <PreviewOpen
                                theme="outline"
                                size="16"
                                fill="#666"
                            />
                            <span className={styles.text}>{count.views}</span>
                        </li>
                    </ul>
                )}
            </div>
            <div className={styles.recommend}>
                <ul>
                    {site &&
                        site.list &&
                        site.list.map((item, index) => (
                            <li key={index}>
                                <Item {...item}></Item>
                            </li>
                        ))}
                </ul>
            </div>
        </aside>
    );
};

export default Asider;
