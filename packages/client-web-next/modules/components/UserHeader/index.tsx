import { User } from '@/modules/types/auth';
import { EmailSecurity, Iphone, EditName } from '@icon-park/react';
import { useCountQuery } from '@/modules/services/countApi';
import {
    Like,
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
            <h5 className={styles['wrapper-avatar']}>
                <span
                    className={styles.avatar}
                    style={{
                        backgroundImage: `url(${user.avatar})`,
                    }}></span>
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
                            <Like theme="outline" size="14" fill="#3d80fd" />
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
            {user && (
                <ul className={styles.info}>
                    <li>
                        <EditName theme="outline" size="14" fill="#666" />
                        <span className={styles['info-text']}>
                            {user.nickname || user.username}
                        </span>
                    </li>
                    <li>
                        <Iphone theme="outline" size="14" fill="#666" />
                        <span className={styles['info-text']}>
                            {user.phone}
                        </span>
                    </li>
                    <li>
                        <EmailSecurity theme="outline" size="14" fill="#666" />
                        <span className={styles['info-text']}>
                            {user.email}
                        </span>
                    </li>
                </ul>
            )}
        </header>
    );
};

export default UserHeader;
