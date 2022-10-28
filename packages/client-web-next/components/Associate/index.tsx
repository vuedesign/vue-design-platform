import { useSitesAssociateQuery } from '@/globals/services/siteApi';
import Item from '@/components/Item';
import styles from './Associate.module.scss';
import { FC } from 'react';

type AssociateProps = {
    uuid: string;
    authorId: number;
    size?: number;
};

const Associate: FC<AssociateProps> = ({ uuid, authorId, size = 2 }) => {
    const { data: site } = useSitesAssociateQuery({ authorId, size, uuid });
    if (!site) {
        return <div>loadding...</div>;
    }
    return (
        <div className={styles.recommend}>
            <ul>
                {site &&
                    site.list &&
                    site.list.map((item, index) => (
                        <li key={index}>
                            <Item {...item}></Item>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Associate;
