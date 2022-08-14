import { useProfileQuery } from '../redux/services/auth';
import Router from 'next/router';
import styles from '../styles/Profile.module.scss';
import { Avatar } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';

const Profile = () => {
  const { data: profile } = useProfileQuery();
  console.log('==profile==', profile);
  const handleGotoLogin = () => {
    Router.push('/login');
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
