import { GithubOne, Home, Star, ThumbsUp, ThumbsDown } from '@icon-park/react';
import Link from 'next/link';
import type { SiteItem } from '@/modules/types/site';
import styles from './Item.module.scss';
import { typeMap } from '@/configs/globals.contants';

const Item = (props: SiteItem) => {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.thumb}>
                    <Link
                        href={{
                            pathname: `/sites/[uuid]`,
                            query: { uuid: props.uuid },
                        }}>
                        <a
                            style={{
                                backgroundImage: `url('${props.thumbUrl}')`,
                            }}></a>
                    </Link>
                </div>
                <div className={styles.tools}>
                    <dl>
                        <dd>
                            <ThumbsUp
                                theme={
                                    props.tool?.top === 1 ? 'filled' : 'outline'
                                }
                                size="16"
                                fill="#666"
                            />
                        </dd>
                        <dd>
                            <ThumbsDown
                                theme={
                                    props.tool?.down === 1
                                        ? 'filled'
                                        : 'outline'
                                }
                                size="16"
                                fill="#666"
                            />
                        </dd>
                        <dt>
                            {props.author && (
                                <Link href={`/users/${props.author.uuid}`}>
                                    <a
                                        className={styles.avatar}
                                        title={props.author.username}>
                                        <span
                                            className={styles.avatar}
                                            style={{
                                                backgroundImage: `url(${props.author.avatar})`,
                                            }}></span>
                                    </a>
                                </Link>
                            )}
                        </dt>
                        <dd>
                            <Star
                                theme={
                                    props.tool?.collections === 1
                                        ? 'filled'
                                        : 'outline'
                                }
                                size="16"
                                fill="#666"
                            />
                        </dd>
                        <dd>
                            {props.type === 'site' && (
                                <Home theme="outline" size="16" fill="#666" />
                            )}
                            {props.type === 'code' && (
                                <GithubOne
                                    theme="outline"
                                    size="16"
                                    fill="#666"
                                />
                            )}
                        </dd>
                    </dl>
                </div>
                <div className={styles.info}>
                    <h5>{props.title}</h5>
                    <p>{props.description}</p>
                    <div className={styles.tags}>
                        {typeMap.has(props.type) && (
                            <span>{typeMap.get(props.type)}</span>
                        )}
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
