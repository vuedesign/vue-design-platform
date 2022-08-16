import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useProfileQuery } from '@/modules/auth/api';
import styles from '../styles/Asider.module.scss';

const Asider = () => {
  const { data: profile } = useProfileQuery();
  return (
    <aside className={styles.container}>
      <div className={styles.profile}>
        {profile && (
          <div className={styles.userinfo}>
            <dl>
              <dt>
                <Avatar
                  size={64}
                  src={profile.avatar}
                  icon={<UserOutlined />}
                />
              </dt>
              <dd>
                <h5>{profile.username}</h5>
              </dd>
            </dl>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Asider;
