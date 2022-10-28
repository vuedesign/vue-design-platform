import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { GithubOne, Home, TagOne } from '@icon-park/react';
import { wrapper } from '@/globals/store';
import { site, useSiteQuery, sitesAssociate } from '@/globals/services/siteApi';
import { count } from '@/globals/services/countApi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tools from '@/components/Tools';
import { getParamsByContext } from '@/globals/utils';
import Asider from '@/components/Asider';
import styles from './Site.module.scss';
import { tool } from '@/globals/services/authApi';
import { typeMap } from '@/configs/globals.contants';
import { containerStyle, headerStyle } from '@/globals/utils/style';

type SiteProps = {
    uuid: string;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const uuid = getParamsByContext<typeof context>(context, 'uuid');
        const { data: siteItem } = await store.dispatch(site.initiate(uuid));
        const authorId = siteItem?.authorId;
        const siteId = siteItem?.id;
        await store.dispatch(count.initiate(authorId));
        await store.dispatch(tool.initiate(siteId));
        await store.dispatch(
            sitesAssociate.initiate({ authorId, size: 2, uuid }),
        );
        return {
            props: {
                uuid,
            },
        };
    },
);

const Site: NextPage<SiteProps> = ({ uuid }: SiteProps) => {
    const { data: detail } = useSiteQuery(uuid);
    if (!detail) {
        return null;
    }
    return (
        <div className={styles.container} style={containerStyle}>
            <Head>
                <title>{`${detail.title} - vue.design`}</title>
                <meta name="description" content={detail.description} />
            </Head>
            <Header headerStyle={headerStyle} />
            <section className={styles.main}>
                <Asider
                    uuid={detail.uuid}
                    authorId={detail.authorId}
                    user={detail.author}
                />
                <article className={styles.article}>
                    <header className={styles.title}>
                        <h1>{detail.title}</h1>
                        <div className={styles.link}>
                            {detail.codeUrl && (
                                <Link href={detail.codeUrl} target="_blank">
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
                            {detail.siteUrl && (
                                <Link href={detail.siteUrl} target="_blank">
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
                        {typeMap.has(detail.type) && (
                            <span>[{typeMap.get(detail.type)}]</span>
                        )}
                        <span className={styles.dot}> · </span>
                        <time>{detail.createdAt}</time>
                        <span className={styles.dot}> · </span>
                        <span>阅读 {detail.views}</span>
                        <span className={styles.dot}> · </span>
                        {detail.tags && (
                            <TagOne
                                theme="outline"
                                size="14"
                                fill="#666"
                                style={{ height: '14px' }}
                            />
                        )}
                        {detail.tags &&
                            detail.tags.map((item, index) => (
                                <span className={styles.tag} key={index}>
                                    {item.name}
                                </span>
                            ))}
                    </div>
                    <div className={styles.content}>{detail.description}</div>
                    <Tools uuid={uuid} />
                </article>
            </section>
            <Footer />
        </div>
    );
};

export default Site;
