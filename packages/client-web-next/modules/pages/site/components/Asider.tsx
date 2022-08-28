import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ShareOne, PreviewOpen } from '@icon-park/react';
import { useSiteQuery, useSitesQuery } from '@/modules/redux/services/siteApi';
import { useCountQuery } from '@/modules/redux/services/countApi';
import styles from '../styles/Asider.module.scss';
import Item from '@/modules/components/Item';

type AsiderProps = {
  uuid: string | undefined;
};
const Asider = ({ uuid }: AsiderProps) => {
  const { data: siteItem } = useSiteQuery(uuid || '');
  const profile = siteItem?.author;
  const authorId = siteItem?.authorId;
  const { data: site } = useSitesQuery({ authorId, size: 2 });
  const { data: count } = useCountQuery(authorId);
  console.log('siteList', site);
  console.log('count', count);
  return (
    <aside className={styles.container}>
      <div className={styles.profile}>
        {profile && (
          <>
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
            <ul className={styles.count}>
              <li>
                <ShareOne theme="outline" size="16" fill="#666" />
                <span className={styles.text}>{count}</span>
              </li>
              <li>
                <PreviewOpen theme="outline" size="16" fill="#666" />
                <span className={styles.text}>0</span>
              </li>
            </ul>
          </>
        )}
      </div>
      <div className={styles.recommend}>
        <ul>
          {site &&
            site.list &&
            site.list.map((item, index) => (
              <li key={index}>
                <Item {...item}></Item>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Asider;
