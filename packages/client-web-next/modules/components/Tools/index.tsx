import { Button, Badge } from 'antd';
import {
    UserOutlined,
    UserSwitchOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from './Tools.module.scss';
import { useState } from 'react';
import { GithubOne, Home, Like, ThumbsUp, ThumbsDown } from '@icon-park/react';

const Tools = () => {
    const [count, setCount] = useState(99);
    //  GithubOne, Home, Like, ThumbsUp, ThumbsDown
    const toolList = [
        {
            icon: <ThumbsUp theme="outline" size="20" fill="#666" />,
            badge: 99,
        },
        {
            icon: <ThumbsDown theme="outline" size="20" fill="#666" />,
            badge: 4,
        },
        {
            icon: <Like theme="outline" size="20" fill="#666" />,
            badge: 20,
        },
    ];
    return (
        <div className={styles.container}>
            <ul>
                {toolList.map((item, index) => (
                    <li key={index}>
                        <Badge count={item.badge} size="small" offset={[0, 6]}>
                            <span className={styles.btn}>{item.icon}</span>
                        </Badge>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tools;
