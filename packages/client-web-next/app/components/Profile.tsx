import { useProfileQuery } from '../redux/services/auth';
import { setUser } from '../redux/features/authSlice';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.scss';
import { Avatar } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
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
  dispatch(setUser(profile));
  return (
    <div className={styles.container}>
      <Avatar size="small" src={profile.avatar} icon={<UserOutlined />} />
      {/* {profile && (profile.username || profile.nickname)} */}
    </div>
  );
};

export default Profile;
