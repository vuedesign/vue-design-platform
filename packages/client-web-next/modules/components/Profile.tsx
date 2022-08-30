import { Avatar, Popover } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useProfileQuery } from '@/modules/redux/services/authApi';
import styles from '../styles/Profile.module.scss';

const text = <span>Title</span>;
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
        placement="bottomRight"
        title={text}
        content={content}
        trigger="click"
      >
        <Avatar size="small" src={profile.avatar} icon={<UserOutlined />} />
      </Popover>
    </div>
  );
};

export default Profile;
