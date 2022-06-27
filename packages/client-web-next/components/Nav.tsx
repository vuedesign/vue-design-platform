import { useState } from "react";
import styles from "../styles/Nav.module.scss";
import {
  SiteListContext,
  SiteListContextType,
} from "../pages/hooks/SiteListContext";

type Item = {
  value: string;
  label: string;
};

const typeList: Array<Item> = [
  {
    value: "all",
    label: "全部",
  },
  {
    value: "site",
    label: "网站",
  },
  {
    value: "code",
    label: "代码",
  },
];

const orderList: Array<Item> = [
  {
    value: "new",
    label: "最新",
  },
  {
    value: "hot",
    label: "最热",
  },
  {
    value: "ai",
    label: "推荐",
  },
];

const Nav = () => {
  const [orderActive, setOrderActive] = useState("new");
  const hanldeCheckOrderClick = (item: Item, context: SiteListContextType) => {
    setOrderActive(item.value);
    const { setQuery, query } = context;
    setQuery(
      Object.assign({}, query, {
        order: item.value,
      })
    );
  };

  const [typeActive, setTypeActive] = useState("all");
  const hanldeCheckTypeClick = (item: Item, context: SiteListContextType) => {
    setTypeActive(item.value);
    const { setQuery, query } = context;
    setQuery(
      Object.assign({}, query, {
        type: item.value,
      })
    );
  };

  return (
    <SiteListContext.Consumer>
      {(context) => (
        <div className={styles.nav}>
          <ul className={styles.tabs}>
            {orderList.map((item) => (
              <li
                className={item.value === orderActive ? styles.active : ""}
                data-type={item.value}
                onClick={() => hanldeCheckOrderClick(item, context)}
                key={item.value}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <ul className={styles.tags}>
            {typeList.map((item) => (
              <li
                className={item.value === typeActive ? styles.active : ""}
                data-type={item.value}
                onClick={() => hanldeCheckTypeClick(item, context)}
                key={item.value}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SiteListContext.Consumer>
  );
};

export default Nav;
