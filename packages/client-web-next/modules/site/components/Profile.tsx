import { Avatar } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useProfileQuery } from '@/modules/auth/api';
import styles from '../styles/Profile.module.scss';

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
      <Avatar size="small" src={profile.avatar} icon={<UserOutlined />} />
      {/* {profile && (profile.username || profile.nickname)} */}
    </div>
  );
};

export default Profile;
