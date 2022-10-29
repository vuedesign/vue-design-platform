import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Popover, message } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import {
    ThumbsUp,
    Power,
    Home,
    UploadOne,
    ShareOne,
    PreviewOpen,
} from '@icon-park/react';
import { useProfileQuery, useLogoutMutation } from '@/globals/services/authApi';
import { useCountProfileQuery } from '@/globals/services/countApi';
import {
    setToken,
    setUser,
    selectCurrentToken,
} from '@/globals/features/authSlice';
import {
    setLoginState,
    setIsSettingVisible,
    setCookie,
    selectCookie,
} from '@/globals/features/globalSlice';
import { AppDispatch } from '@/globals/store';
import { setOpen } from '@/globals/features/globalSlice';
import styles from './Profile.module.scss';
import { details } from '@/configs/globals.contants';

const ProfilePopoverHeader = () => {
    const { data: profile } = useProfileQuery();
    const { data: count } = useCountProfileQuery();
    return (
        <>
            {profile && (
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
            )}
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
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        logout()
            .then(() => {
                chrome.cookies.remove(details, (cookie) => {
                    message.success('退出登录');
                    setTimeout(() => {
                        dispatch(setToken(null));
                        dispatch(setUser(null));
                        dispatch(setLoginState());
                    }, 200);
                });
            })
            .catch(() => {
                message.warning('退出失败');
            });
    };
    return (
        <div className={styles['popover-content']}>
            <ul className={styles['popover-content-menu']}>
                <li>
                    <a href={`${details.url}/profile`}>
                        <Home theme="outline" size="16" />
                        <span className={styles['btn-text']}>个人中心</span>
                    </a>
                </li>
                <li>
                    <a href={`${details.url}/profile`}>
                        <UploadOne theme="outline" size="16" />
                        <span className={styles['btn-text']}>我的推荐</span>
                    </a>
                </li>
            </ul>
            <dl className={styles['popover-content-buttom']}>
                <dt>
                    <a onClick={() => dispatch(setIsSettingVisible(true))}>
                        <span className={styles['btn-text']}>我的设置</span>
                    </a>
                </dt>
                <dd>
                    <a onClick={handleLogout}>
                        <span className={styles['btn-text']}>退出登录</span>
                    </a>
                </dd>
            </dl>
        </div>
    );
};

const Profile = () => {
    const dispatch = useDispatch();
    const { data: profile, refetch } = useProfileQuery();
    const cookie = useSelector(selectCookie);
    useEffect(() => {
        refetch();
    }, [cookie]);

    try {
        chrome.cookies.get(details, (cookie) => {
            if (cookie && cookie.value) {
                console.log('cookie.value===', cookie.value);
                dispatch(setCookie(cookie.value));
            }
        });
    } catch (error) {}

    const handleOpenDialogLogin = () => {
        dispatch(setOpen(true));
    };

    if (!profile) {
        return (
            <div
                className={styles['btn-login']}
                onClick={handleOpenDialogLogin}>
                <UserSwitchOutlined />
                <span className={styles.text}>登录/注册</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {profile && (
                <Popover
                    overlayClassName="profile-popover-overlay"
                    placement="bottomRight"
                    title={<ProfilePopoverHeader />}
                    content={<ProfilePopoverContent />}
                    trigger="click">
                    <Avatar
                        size={32}
                        src={profile.avatar}
                        icon={<UserOutlined />}
                    />
                </Popover>
            )}
        </div>
    );
};

export default Profile;
