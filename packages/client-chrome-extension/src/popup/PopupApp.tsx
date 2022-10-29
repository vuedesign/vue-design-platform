import { FC } from 'react';
import logoImage from '@/assets/images/logo.png';
import usePopup, { MenuListItem } from './usePopup';
import styles from './Popup.module.scss';
import { TagOne, Send } from '@icon-park/react';
import { IconRender } from '@/globals/utils/component';

const Popup: FC = () => {
    const { handleNewTab, handleRecommend, menuList } = usePopup();
    const hanldeCommand = ({ key }: MenuListItem) => {
        switch (key) {
            case 'new_tab':
                handleNewTab();
                break;
            case 'recommend':
                handleRecommend();
                break;
            default:
                break;
        }
    };
    return (
        <div className={styles['vue-design-popup']}>
            <header className={styles['vue-design-popup-header']}>
                <img src={logoImage} />
                <span>专注前端开发者</span>
            </header>
            <footer className={styles['vue-design-popup-content']}>
                <ul>
                    {menuList.map((item) => (
                        <li key={item.key} onClick={() => hanldeCommand(item)}>
                            <IconRender
                                map={{ TagOne, Send }}
                                is={item.icon}
                                theme="outline"
                                size={18}
                                fill="#3d7eff"
                            />
                            <span className="text">{item.title}</span>
                        </li>
                    ))}
                </ul>
            </footer>
        </div>
    );
};

export default Popup;
