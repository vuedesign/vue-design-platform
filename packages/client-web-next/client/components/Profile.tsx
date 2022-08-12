import { useAuthProfileQuery } from '../../globals/apis';
import Router from 'next/router';
import styles from '../styles/Profile.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Profile = () => {
  const token = useSelector((state: RootState) => state.app.token);
  console.log('token===', token);
  const { isSuccess, data: profile } = useAuthProfileQuery();

  console.log('profile', isSuccess, profile);
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
