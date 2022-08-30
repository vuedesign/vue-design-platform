import { Avatar, Popover } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useProfileQuery } from '@/modules/redux/services/authApi';
import styles from '../styles/Profile.module.scss';

const text = (profile) => (
  <dl className={styles['popover-profile-info']}>
    <dt>
      <Avatar size={48} src={profile.avatar} icon={<UserOutlined />} />
    </dt>
    <dd>{profile.username}</dd>
  </dl>
);
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

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
        title={text(profile)}
        content={content}
        trigger="click"
      >
        <Avatar size={32} src={profile.avatar} icon={<UserOutlined />} />
      </Popover>
    </div>
  );
};

export default Profile;
