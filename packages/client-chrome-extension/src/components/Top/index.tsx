import { UploadOne } from '@icon-park/react';
import logoImage from '@/assets/images/logo.png';
import styles from './Top.module.scss';
import Profile from '../Profile';

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

const Top = () => {
    // const router = useRouter();
    const handleGotoHome = () => {
        // router.push({
        //     pathname: '/',
        // });
    };
    const handleRecommend = () => {
        // router.push({
        //     pathname: '/page/recommend',
        // });
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <ul className={styles.nav}>
                        <li>
                            <h1
                                className={styles.logo}
                                onClick={handleGotoHome}>
                                <img
                                    src={logoImage}
                                    alt=""
                                    width={224}
                                    height={38}
                                />
                            </h1>
                        </li>
                        {navList.map((item, index) => (
                            <li key={index}>
                                <a href={item.path}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.user}>
                        <li>
                            <div className={`${styles.btn} ${styles.wechat}`}>
                                {/* <home-popper arrow placement="bottom">
                <div className="find-header-wechat-title">
                  <wechat theme="outline" size="16" fill="#999" />
                  <span className="text">关注公众号</span>
                </div>
                <template #content>
                  <div className="find-header-wechat-popper-content">
                    <img src="../assets/images/wechat.png" />
                  </div>
                </template>
              </home-popper> */}
                            </div>
                        </li>
                        <li>
                            <div
                                className={`${styles.btn} ${styles.recommend}`}
                                onClick={handleRecommend}>
                                <UploadOne
                                    className="btn-upload-one"
                                    theme="outline"
                                    size="14"
                                />
                                <span className={styles.text}>我要推荐</span>
                            </div>
                        </li>
                        <li>
                            <Profile />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Top;
