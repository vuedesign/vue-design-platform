import { GithubOne, Home, Like, ThumbsUp, ThumbsDown } from '@icon-park/react';
import { Tooltip } from 'antd';
import Link from 'next/link';
import styles from '../styles/Item.module.scss';
import type { SiteItem } from '@/modules/redux/types/site';

const Item = (props: SiteItem) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.thumb}>
          <Link href={`/site/${props.uuid}`}>
            <a
              style={{
                backgroundImage: `url('${props.thumbUrl}')`,
              }}
            ></a>
          </Link>
        </div>
        <div className={styles.tools}>
          <dl>
            <dd>
              <ThumbsUp theme="outline" size="16" fill="#666" />
            </dd>
            <dd>
              <ThumbsDown theme="outline" size="16" fill="#666" />
            </dd>
            <dt>
              {props.author && (
                <Tooltip placement="bottom" title={props.author.username}>
                  <span
                    style={{ backgroundImage: `url(${props.author.avatar})` }}
                  ></span>
                </Tooltip>
              )}
            </dt>
            <dd>
              <Like theme="outline" size="16" fill="#666" />
            </dd>
            <dd>
              {props.type === 'site' && (
                <Home theme="outline" size="16" fill="#666" />
              )}
              {props.type === 'code' && (
                <GithubOne theme="outline" size="16" fill="#666" />
              )}
            </dd>
          </dl>
        </div>
        <div className={styles.info}>
          <h5>{props.title}</h5>
          <p>{props.description}</p>
          <div className={styles.tags}>
            {(props.tags &&
              props.tags.length &&
              props.tags.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))) ||
              ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
