import { FC } from 'react';
import styles from './Header.module.scss';
import Top from '../Top';

type NavItem = {
    path: string;
    label: string;
};
const navList: NavItem[] = [
    {
        path: '/',
        label: '首页',
    },
    {
        path: '/sites',
        label: '发现',
    },
];

interface Props {
    headerStyle: Record<string, string | number>;
}

const Header: FC<Props> = ({ headerStyle }) => {
    return (
        <header className={styles.container} style={headerStyle}>
            <Top />
        </header>
    );
};

export default Header;
