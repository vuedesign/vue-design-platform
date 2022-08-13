import { useProfileQuery } from '../redux/services/auth';
import Router from 'next/router';
import styles from '../styles/Profile.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Profile = () => {
  const { data: profile } = useProfileQuery();

  const handleGotoLogin = () => {
    Router.push('/login');
  };
  if (!profile) {
    return (
      <div className={styles.container} onClick={handleGotoLogin}>
        登录/注册
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {profile && (profile.username || profile.nickname)}
    </div>
  );
};

export default Profile;
