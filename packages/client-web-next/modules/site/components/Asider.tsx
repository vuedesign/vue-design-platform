import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSiteQuery } from '@/modules/site/api';
import styles from '../styles/Asider.module.scss';

type AsiderProps = {
  uuid: string | undefined;
};
const Asider = ({ uuid }: AsiderProps) => {
  const { data: siteItem } = useSiteQuery(uuid || '');
  const profile = siteItem?.author;
  return (
    <aside className={styles.container}>
      <div className={styles.profile}>
        {profile && (
          <div className={styles.userinfo}>
            <dl>
              <dt>
                <Avatar
                  size={48}
                  src={profile.avatar}
                  icon={<UserOutlined />}
                />
              </dt>
              <dd>
                <h5>{profile.username}</h5>
                <p></p>
              </dd>
            </dl>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Asider;
