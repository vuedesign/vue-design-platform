import { GithubOne, Home, Star, ThumbsUp, ThumbsDown } from '@icon-park/react';
import type { SiteItem, Tool } from '@/globals/types/site';
import styles from './Item.module.scss';
import { typeMap } from '@/configs/globals.contants';

type ToolType = 'top' | 'down' | 'collections';
type ThemeType = 'filled' | 'outline';
type ColorType = '#3d80fd' | '#666';

const Item = (props: SiteItem) => {
    const getIconTheme = (type: ToolType, tool?: Tool): ThemeType => {
        if (!tool) {
            return 'outline';
        }
        return tool[type] === 1 ? 'filled' : 'outline';
    };
    const getIconColor = (type: ToolType, tool?: Tool): ColorType => {
        if (!tool) {
            return '#666';
        }
        return tool[type] === 1 ? '#3d80fd' : '#666';
    };
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.thumb}>
                    {props.uuid && (
                        <a
                            href={`/sites/${props.uuid}`}
                            style={{
                                backgroundImage: props.thumbUrl
                                    ? `url('${props.thumbUrl}')`
                                    : 'none',
                            }}></a>
                    )}
                </div>
                <div className={styles.tools}>
                    <dl>
                        <dd>
                            <ThumbsUp
                                theme={getIconTheme('top', props.tool)}
                                fill={getIconColor('top', props.tool)}
                                size="16"
                            />
                        </dd>
                        <dd>
                            <ThumbsDown
                                theme={getIconTheme('down', props.tool)}
                                fill={getIconColor('down', props.tool)}
                                size="16"
                            />
                        </dd>
                        <dt>
                            {props.author && (
                                <a
                                    href={`/users/${props.author.uuid}`}
                                    className={styles.avatar}
                                    title={props.author.username}>
                                    <span
                                        className={styles.avatar}
                                        style={{
                                            backgroundImage: `url(${props.author.avatar})`,
                                        }}></span>
                                </a>
                            )}
                        </dt>
                        <dd>
                            <Star
                                theme={getIconTheme('collections', props.tool)}
                                fill={getIconColor('collections', props.tool)}
                                size="16"
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
