import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThumbsUp, ThumbsDown, Star } from '@icon-park/react';
import { useLikeMutation, useToolQuery } from '@/globals/services/authApi';
import { useSiteQuery } from '@/globals/services/siteApi';
import { selectLoginState, setOpen } from '@/globals/features/globalSlice';
import { selectCurrentUser } from '@/globals/features/authSlice';
import styles from './Tools.module.scss';

type TooItemType = 'top' | 'down' | 'collections';
type TooItem = {
    type: TooItemType;
    icon: (active: boolean) => ReactElement;
};
type SiteProps = {
    uuid: string;
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

const Tools = ({ uuid }: SiteProps) => {
    const { data: detail, refetch: refetchSite } = useSiteQuery(uuid);
    if (!detail) {
        return null;
    }
    const { data: tool, refetch: refetchTool } = useToolQuery(detail.id);
    const { top, down, collections } = detail;
    const [badges, setBadges] = useState({
        top,
        down,
        collections,
    });

    const [like] = useLikeMutation();
    const profile = useSelector(selectCurrentUser);
    const loginState = useSelector(selectLoginState);
    const dispatch = useDispatch();

    useEffect(() => {
        refetchTool();
    }, [loginState]);

    const handleClick = (type: TooItemType) => {
        if (!profile) {
            dispatch(setOpen(true));
            return;
        }
        like({
            type,
            siteId: detail.id || 0,
            value: tool ? tool[type] : 0,
        }).then((res) => {
            if (!res) {
                return;
            }
            refetchSite();
            refetchTool();
        });
    };

    useEffect(() => {
        setBadges({
            top: detail.top,
            down: detail.down,
            collections: detail.collections,
        });
    }, [detail]);

    const isTool = (type: TooItemType) => {
        if (!tool) {
            return undefined;
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

export default Tools;
