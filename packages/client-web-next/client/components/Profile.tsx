import { useAuthProfileQuery } from '../../globals/apis';
import Router from 'next/router';
import styles from '../styles/Profile.module.scss';

const Profile = () => {
  const { isSuccess, data: profile } = useAuthProfileQuery();

  const handleGotoLogin = () => {
    Router.push('/login');
  };
  if (!isSuccess) {
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
