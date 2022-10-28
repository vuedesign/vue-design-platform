import { Avatar } from 'antd';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import {
    ShareOne,
    PreviewOpen,
    ThumbsUp,
    ArrowCircleRight,
} from '@icon-park/react';
import { useSitesAssociateQuery } from '@/globals/services/siteApi';
import { useCountQuery } from '@/globals/services/countApi';
import Item from '@/components/Item';
import Associate from '@/components/Associate';
import { User } from '@/globals/types/auth';
import styles from './Asider.module.scss';

type AsiderProps = {
    uuid: string;
    authorId: number;
    user: Partial<User>;
};
const Asider = ({ uuid, authorId, user }: AsiderProps) => {
    // const { data: site } = useSitesAssociateQuery({ authorId, size: 2, uuid });
    const { data: count } = useCountQuery(authorId);
    return (
        <aside className={styles.container}>
            <div className={styles.user}>
                {user && (
                    <div className={styles.userinfo}>
                        <dl>
                            <dt>
                                <Avatar
                                    size={48}
                                    src={user.avatar}
                                    icon={<UserOutlined />}
                                />
                            </dt>
                            <dd>
                                <h5>{user.username}</h5>
                                <p>
                                    <Link href={`/users/${user.uuid}`}>
                                        <a className={styles.link}>
                                            <span
                                                className={styles['link-text']}>
                                                个人主页
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
            <Associate authorId={authorId} uuid={uuid} />
        </aside>
    );
};

export default Asider;
