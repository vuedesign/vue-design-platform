import { EmailSecurity, Iphone, EditName } from '@icon-park/react';
import { useCountsQuery, useProfileQuery } from '@/globals/services/authApi';
import {
    Like,
    ThumbsUp,
    ThumbsDown,
    PreviewOpen,
    Home,
} from '@icon-park/react';
import styles from './ProfileHeader.module.scss';

const ProfileHeader = () => {
    const { data: user } = useProfileQuery();
    const { data: counts } = useCountsQuery();
    return (
        <header className={styles.container}>
            {user && (
                <h5 className={styles['wrapper-avatar']}>
                    <span
                        className={styles.avatar}
                        style={{
                            backgroundImage: `url(${user.avatar})`,
                        }}></span>
                </h5>
            )}
            {counts && (
                <ul className={styles.count}>
                    <li>
                        <span className={styles['count-icon']}>
                            <Home theme="outline" size="14" fill="#3d80fd" />
                        </span>
                        <span className={styles['count-text']}>
                            {counts.sites}
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
                            {counts.views}
                        </span>
                    </li>
                    <li>
                        <span className={styles['count-icon']}>
                            <Like theme="outline" size="14" fill="#3d80fd" />
                        </span>
                        <span className={styles['count-text']}>
                            {counts.collections}
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
                            {counts.top}
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
                            {counts.down}
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

export default ProfileHeader;
