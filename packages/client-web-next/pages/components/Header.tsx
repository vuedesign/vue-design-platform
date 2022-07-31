import { SettingTwo } from "@icon-park/react";
import styles from "../styles/Header.module.scss";
import Top from "./Top";
import { NavigationContext } from "../hooks/NavigationContext";
import Image from "next/image";
import logoImage from "../public/images/logo.png";
// import { gql, useQuery, NetworkStatus } from "@apollo/client";
// import { NAVIGATIONS_QUERY } from "../libs/gql";

const Header = () => {
  return (
    <NavigationContext.Consumer>
      {({ list }) => (
        <header className={styles.container}>
          <div className={styles.wrapper}>
            <Top />
            <div className={styles.mine}>
              <ul className={styles["mine-sites"]}>
                {list.map((item) => {
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
    </NavigationContext.Consumer>
  );
};

export default Header;