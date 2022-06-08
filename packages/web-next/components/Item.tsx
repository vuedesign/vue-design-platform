import styles from '../styles/Item.module.scss'
import type { SiteItemType } from '../types/site.d'
import { GithubOne, Home, Like, ThumbsUp, ThumbsDown } from '@icon-park/react'

const defaultProps = {
  thumbUrl: '',
  id: 0,
  title: '',
  description: '',
  tags: () => [],
  user: () => ({
    avatar: 'string',
    username: 'string'
  }),
  type: 'site'
}

const Item = (props: SiteItemType) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.thumb}>
          <a
            href="#"
            style={{
              backgroundImage: `url('${props.thumbUrl}')`
            }}
          ></a>
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
              {props.user && props.user.avatar && (
                <img src={props.user.avatar} />
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
            {props.tags &&
              props.tags.length &&
              props.tags.map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
