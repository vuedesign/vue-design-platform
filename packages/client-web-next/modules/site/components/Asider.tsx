import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useProfileQuery } from '@/modules/auth/api';
import { useSiteQuery } from '@/modules/site/api';
import { selectCurrentSiteItem } from '@/modules/site/slice';
import styles from '../styles/Asider.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '@/globals/redux/store';

const Asider = ({ uuid }: { uuid: string }) => {
  const { data: siteItem } = useSiteQuery(uuid);
  //   const profile = useSelector((state: RootState) => state.site.siteItem);
  const profile = siteItem?.author;

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
