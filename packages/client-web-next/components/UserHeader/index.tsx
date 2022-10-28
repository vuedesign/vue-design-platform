import { User } from '@/globals/types/auth';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useCountQuery } from '@/globals/services/countApi';
import {
    Like,
    Star,
    ThumbsUp,
    ThumbsDown,
    PreviewOpen,
    Home,
} from '@icon-park/react';
import styles from './UserHeader.module.scss';

type UserHeaderProps = {
    user: User;
};

const UserHeader = ({ user }: UserHeaderProps) => {
    const { data: count } = useCountQuery(user.id);
    return (
        <header className={styles.container}>
            <div className={styles['user-avatar']}>
                <Avatar size={48} icon={<UserOutlined />} src={user.avatar} />
            </div>
            <h5 className={styles['user-name']}>
                <span className={styles['user-name-text']}>
                    {user && (user.nickname || user.username)}
                </span>
            </h5>
            {count && (
                <ul className={styles.count}>
                    <li>
                        <span className={styles['count-icon']}>
                            <Home theme="outline" size="14" fill="#3d80fd" />
                        </span>
                        <span className={styles['count-text']}>
                            {count.sites}
                        </span>
                    </li>
                    <li>
                        <span className={styles['count-icon']}>
                            <PreviewOpen
                                theme="outline"
                                size="14"
                                fill="#3d80fd"
                            />
                        </span>
                        <span className={styles['count-text']}>
                            {count.views}
                        </span>
                    </li>
                    <li>
                        <span className={styles['count-icon']}>
                            <Star theme="outline" size="14" fill="#3d80fd" />
                        </span>
                        <span className={styles['count-text']}>
                            {count.collections}
                        </span>
                    </li>
                    <li>
                        <span className={styles['count-icon']}>
                            <ThumbsUp
                                theme="outline"
                                size="14"
                                fill="#3d80fd"
                            />
                        </span>
                        <span className={styles['count-text']}>
                            {count.top}
                        </span>
                    </li>
                    <li>
                        <span className={styles['count-icon']}>
                            <ThumbsDown
                                theme="outline"
                                size="14"
                                fill="#3d80fd"
                            />
                        </span>
                        <span className={styles['count-text']}>
                            {count.down}
                        </span>
                    </li>
                </ul>
            )}
        </header>
    );
};

export default UserHeader;
