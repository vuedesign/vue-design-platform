import { FC } from 'react';
import styles from './Header.module.scss';
import Top from '../Top';

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
