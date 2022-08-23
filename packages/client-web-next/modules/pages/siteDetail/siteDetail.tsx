import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  GithubOne,
  Home,
  Like,
  ThumbsUp,
  ThumbsDown,
  TagOne,
} from '@icon-park/react';
import { wrapper } from '@/modules/redux/store';
import { profile } from '@/modules/redux/services/authApi';
import { setToken, setUser } from '@/modules/redux/features/authSlice';
import { User } from '@/modules/redux/types/auth';
import { site, sites } from '@/modules/redux/services/siteApi';
import { SiteItem } from '@/modules/redux/types/site';
import Top from '@/modules/components/Top';
import Footer from '@/modules/components/Footer';
import Asider from './components/Asider';
import styles from './SiteDetail.module.scss';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const uuid = params?.uuid || '';
      await store.dispatch(setToken(req.cookies.token || ''));
      await store.dispatch(profile.initiate());
      //   await store.dispatch(setUser(user as User));
      const { data: siteItem } = await store.dispatch(
        site.initiate(uuid as string),
      );
      const authorId = siteItem?.authorId;
      await store.dispatch(sites.initiate({ authorId, size: 2 }));
      return {
        props: {
          siteItem,
        },
      };
    },
);

type SiteProps = {
  siteItem: SiteItem;
};

const Tools = () => {
  const [count, setCount] = useState(99);
  //  GithubOne, Home, Like, ThumbsUp, ThumbsDown
  const toolList = [
    {
      icon: (
        <ThumbsUp
          theme="outline"
          size="20"
          fill="#666"
          style={{ height: '20px' }}
        />
      ),
      badge: 99,
    },
    {
      icon: (
        <ThumbsDown
          theme="outline"
          size="20"
          fill="#666"
          style={{ height: '20px' }}
        />
      ),
      badge: 4,
    },
    {
      icon: (
        <Like
          theme="outline"
          size="20"
          fill="#666"
          style={{ height: '20px' }}
        />
      ),
      badge: 20,
    },
  ];
  return (
    <div className={styles.tools}>
      <ul>
        {toolList.map((item, index) => (
          <li key={index}>
            <span className={styles['tools-text']}>{item.badge}</span>
            <span className={styles['tools-btn']}>{item.icon}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Site: NextPage<SiteProps> = ({ siteItem }: SiteProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>vue.design-site</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Top />
      </header>
      <section className={styles.main}>
        {siteItem && (
          <article className={styles.article}>
            <header className={styles.title}>
              <h1>{siteItem.title}</h1>
              <div className={styles.link}>
                {siteItem.codeUrl && (
                  <Link href={siteItem.codeUrl} target="_blank">
                    <span className={styles['link-btn']}>
                      <GithubOne
                        theme="outline"
                        size="16"
                        fill="#666"
                        style={{ height: '16px' }}
                      />
                    </span>
                  </Link>
                )}
                {siteItem.siteUrl && (
                  <Link href={siteItem.siteUrl} target="_blank">
                    <span className={styles['link-btn']}>
                      <Home
                        theme="outline"
                        size="16"
                        fill="#666"
                        style={{ height: '16px' }}
                      />
                    </span>
                  </Link>
                )}
              </div>
            </header>
            <div className={styles.meta}>
              <span>[{siteItem.type}]</span>
              <span className={styles.dot}> · </span>
              <time>{siteItem.createdAt}</time>
              <span className={styles.dot}> · </span>
              <span>阅读 {siteItem.views}</span>
              <span className={styles.dot}> · </span>
              {siteItem.tags && (
                <TagOne
                  theme="outline"
                  size="14"
                  fill="#666"
                  style={{ height: '14px' }}
                />
              )}
              {siteItem.tags &&
                siteItem.tags.map((item, index) => (
                  <span className={styles.tag} key={index}>
                    {item.name}
                  </span>
                ))}
            </div>
            <div className={styles.content}>{siteItem.description}</div>
            <Tools />
          </article>
        )}
        <Asider uuid={siteItem.uuid} />
      </section>
      <Footer />
    </div>
  );
};

export default Site;
