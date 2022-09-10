import { Avatar, Popover, Button } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import {
    ThumbsUp,
    Power,
    Home,
    UploadOne,
    ShareOne,
    PreviewOpen,
} from '@icon-park/react';
import { useRouter } from 'next/router';
import { wrapper } from '@/modules/store';
import { useProfileQuery, profile } from '@/modules/services/authApi';
import {
    useCountProfileQuery,
    countProfile,
} from '@/modules/services/countApi';
import { setToken } from '@/modules/features/authSlice';
import { User } from '@/modules/types/auth';
import styles from './Profile.module.scss';
import Link from 'next/link';

type ProfilePopoverHeaderProps = {
    profile: User;
};

const ProfilePopoverHeader = ({ profile }: ProfilePopoverHeaderProps) => {
    const { data: count } = useCountProfileQuery();
    return (
        <>
            <dl className={styles['profile-popover-header']}>
                <dt>
                    <Avatar
                        size={48}
                        src={profile.avatar}
                        icon={<UserOutlined />}
                    />
                </dt>
                <dd>{profile.username}</dd>
            </dl>
            {count && (
                <ul className={styles['popover-content-count']}>
                    <li>
                        <ShareOne theme="outline" size="16" fill="#666" />
                        <span className={styles.text}>{count.sites}</span>
                    </li>
                    <li>
                        <ThumbsUp theme="outline" size="16" fill="#666" />
                        <span className={styles.text}>{count.top}</span>
                    </li>
                    <li>
                        <PreviewOpen theme="outline" size="16" fill="#666" />
                        <span className={styles.text}>{count.views}</span>
                    </li>
                </ul>
            )}
        </>
    );
};

const ProfilePopoverContent = () => {
    return (
        <div className={styles['popover-content']}>
            <ul className={styles['popover-content-menu']}>
                <li>
                    <Link href="/profile">
                        <a>
                            <Home theme="outline" size="16" />
                            <span className={styles['btn-text']}>个人中心</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/profile">
                        <a>
                            <UploadOne theme="outline" size="16" />
                            <span className={styles['btn-text']}>我的推荐</span>
                        </a>
                    </Link>
                </li>
            </ul>
            <dl className={styles['popover-content-buttom']}>
                <dt>
                    <a>
                        <span className={styles['btn-text']}>我的设置</span>
                    </a>
                </dt>
                <dd>
                    <a>
                        <span className={styles['btn-text']}>退出登录</span>
                    </a>
                </dd>
            </dl>
        </div>
    );
};

const Profile = () => {
    const { data: profile } = useProfileQuery();
    const router = useRouter();
    const handleGotoLogin = () => {
        router.push('/login');
    };

    if (!profile) {
        return (
            <div className={styles['btn-login']} onClick={handleGotoLogin}>
                <UserSwitchOutlined />
                <span className={styles.text}>登录/注册</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Popover
                overlayClassName="profile-popover-overlay"
                placement="bottomRight"
                title={<ProfilePopoverHeader profile={profile} />}
                content={<ProfilePopoverContent />}
                trigger="click">
                <Avatar
                    size={32}
                    src={profile.avatar}
                    icon={<UserOutlined />}
                />
            </Popover>
        </div>
    );
};

export default Profile;
