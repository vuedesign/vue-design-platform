import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
    GithubOne,
    Home,
    Star,
    ThumbsUp,
    ThumbsDown,
    TagOne,
} from '@icon-park/react';
import { wrapper } from '@/modules/store';
import { site, useSiteQuery, sitesAssociate } from '@/modules/services/siteApi';
import { selectCurrentToken } from '@/modules/features/authSlice';
import { count } from '@/modules/services/countApi';
import { SiteItem } from '@/modules/types/site';
import Top from '@/modules/components/Top';
import Footer from '@/modules/components/Footer';
import { getParamsByContext } from '@/modules/utils';
import Asider from '@/modules/components/Asider';
import styles from './Site.module.scss';
import { useLikeMutation } from '@/modules/services/authApi';
import { typeMap } from '@/configs/globals.contants';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '@/modules/features/globalSlice';

type SiteProps = {
    uuid: string;
    tool?: {
        top: number;
        down: number;
        collections: number;
    };
};
type TooItemType = 'top' | 'down' | 'collections';
type TooItem = {
    type: TooItemType;
    icon: (active: boolean) => ReactElement;
};

const toolList: Array<TooItem> = [
    {
        type: 'top',
        icon: (active: boolean) => (
            <ThumbsUp
                theme={active ? 'filled' : 'outline'}
                size="20"
                fill={active ? '#3d80fd' : '#666'}
                style={{ height: '20px' }}
            />
        ),
    },
    {
        type: 'down',
        icon: (active: boolean) => (
            <ThumbsDown
                theme={active ? 'filled' : 'outline'}
                size="20"
                fill={active ? '#3d80fd' : '#666'}
                style={{ height: '20px' }}
            />
        ),
    },
    {
        type: 'collections',
        icon: (active: boolean) => (
            <Star
                theme={active ? 'filled' : 'outline'}
                size="20"
                fill={active ? '#3d80fd' : '#666'}
                style={{ height: '20px' }}
            />
        ),
    },
];

const Tools = ({ uuid, tool }: SiteProps) => {
    const { data: detail, refetch } = useSiteQuery(uuid);
    if (!detail) {
        return null;
    }
    const [badges, setBadges] = useState({
        top: detail.top || 0,
        down: detail.down || 0,
        collections: detail.collections || 0,
    });

    const [like, { isLoading }] = useLikeMutation();
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const handleClick = (type: TooItemType) => {
        console.log('token', token);
        if (!token) {
            dispatch(setOpen(true));
            return;
        }
        like({
            type,
            siteId: detail.id || 0,
            value: tool ? tool[type] : 0,
        }).then((res) => {
            console.log('res', res);
            if (!res) {
                return;
            }
            refetch();
        });
    };

    useEffect(() => {
        setBadges({
            top: detail.top || 0,
            down: detail.down || 0,
            collections: detail.collections || 0,
        });
    }, [detail]);

    const isTool = (type: TooItemType) => {
        if (!tool) {
            return;
        }
        if (tool[type]) {
            return tool[type] === 1 ? 'active' : undefined;
        }
    };

    const isActive = (type: TooItemType) => {
        if (!tool) {
            return false;
        }
        return tool[type] === 1;
    };

    return (
        <div className={styles.tools}>
            <ul>
                {toolList.map((item, index) => (
                    <li
                        key={index}
                        className={isTool(item.type)}
                        data-type={item.type}>
                        <span className={styles['tools-text']}>
                            {badges[item.type]}
                        </span>
                        <span
                            onClick={() => handleClick(item.type)}
                            className={styles['tools-btn']}>
                            {item.icon(isActive(item.type))}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const uuid = getParamsByContext<typeof context>(context, 'uuid');
        const { data: siteItem } = await store.dispatch(site.initiate(uuid));
        const authorId = siteItem?.authorId;
        await store.dispatch(count.initiate(authorId));
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
    console.log('detail', detail);
    return (
        <div className={styles.container}>
            <Head>
                <title>vue.design-site</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <Top />
            </header>
            <section className={styles.main}>
                {detail && (
                    <>
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
                                        <Link
                                            href={detail.codeUrl}
                                            target="_blank">
                                            <span
                                                className={styles['link-btn']}>
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
                                        <Link
                                            href={detail.siteUrl}
                                            target="_blank">
                                            <span
                                                className={styles['link-btn']}>
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
                                        <span
                                            className={styles.tag}
                                            key={index}>
                                            {item.name}
                                        </span>
                                    ))}
                            </div>
                            <div className={styles.content}>
                                {detail.description}
                            </div>
                            <Tools uuid={uuid} tool={detail.tool} />
                        </article>
                    </>
                )}
            </section>
            <Footer />
        </div>
    );
};

export default Site;
