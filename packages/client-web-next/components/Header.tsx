import { SettingTwo } from "@icon-park/react";
import styles from "../styles/Header.module.scss";
import Top from "./Top";
import { NavigationListContext } from "../hooks/NavigationListContext";
import Image from "next/image";
import logoImage from "../public/images/logo.png";

const Header = () => {
  return (
    <NavigationListContext.Consumer>
      {({ navList }) => (
        <header className={styles.container}>
          <div className={styles.wrapper}>
            <Top />
            <div className={styles.logo}>
              <Image src={logoImage} alt="logo" width={224} height={38} />
            </div>
            <div className={styles.mine}>
              <span className={styles["mine-setting"]}>
                <SettingTwo theme="outline" size="16" fill="#e1e9ed" />
              </span>
              <ul className={styles["mine-sites"]}>
                {navList.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={item.siteUrl} target="_blank" rel="noreferrer">
                        <dl>
                          <dt>
                            <img src={item.iconUrl} alt={"test"} />
                            {/* <Image
                              src={item.iconUrl}
                              alt={""}
                              width={48}
                              height={48}
                            /> */}
                          </dt>
                          <dd>
                            <h4>{item.title}</h4>
                            {/* <p>{item.description}</p> */}
                          </dd>
                        </dl>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div
            className={styles.bg}
            style={{ backgroundImage: `url(/images/header_bg.png)` }}
          ></div>
        </header>
      )}
    </NavigationListContext.Consumer>
  );
};

export default Header;
