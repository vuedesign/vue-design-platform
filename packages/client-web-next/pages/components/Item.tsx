import { GithubOne, Home, Like, ThumbsUp, ThumbsDown } from "@icon-park/react";
import Image from "next/image";
import styles from "../styles/Item.module.scss";
import type { SiteItemType } from "../types/site.d";

const defaultProps = {
  thumbUrl: "",
  id: 0,
  title: "",
  description: "",
  tagIds: () => [],
  author: () => ({
    avatar: "string",
    username: "string",
  }),
  type: "site",
};

const Item = (props: SiteItemType) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.thumb}>
          <a
            href="#"
            style={{
              backgroundImage: `url('${props.thumbUrl}')`,
            }}
          ></a>
        </div>
        <div className={styles.tools}>
          <dl>
            <dd>
              <ThumbsUp theme="outline" size="16" fill="#666" />
            </dd>
            <dd>
              <ThumbsDown theme="outline" size="16" fill="#666" />
            </dd>
            <dt>
              {props.author && (
                <Image
                  src={props.author.avatar}
                  alt={props.author.username}
                  width={28}
                  height={28}
                />
              )}
            </dt>
            <dd>
              <Like theme="outline" size="16" fill="#666" />
            </dd>
            <dd>
              {props.type === "site" && (
                <Home theme="outline" size="16" fill="#666" />
              )}
              {props.type === "code" && (
                <GithubOne theme="outline" size="16" fill="#666" />
              )}
            </dd>
          </dl>
        </div>
        <div className={styles.info}>
          <h5>{props.title}</h5>
          <p>{props.description}</p>
          <div className={styles.tags}>
            {props.tagIds &&
              props.tagIds.length &&
              props.tagIds.split(",").map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
