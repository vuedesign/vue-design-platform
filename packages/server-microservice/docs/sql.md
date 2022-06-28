#### 站点主表

###### 表名：site

| 字段        | 类型         | 是否为空 | 描述                       |
| ----------- | ------------ | -------- | -------------------------- |
| id          | INT(11)      | 否       | ID                         |
| uuid        | VARCHAR(36)  | 否       | 对外暴露                   |
| title       | VARCHAR(255) | 否       | 名称 (标题)                |
| thumb_url   | VARCHAR(255) | 否       | 封面 url                   |
| logo_url    | VARCHAR(255) | 是       | logo url                   |
| icon_url    | VARCHAR(255) | 是       | icon url                   |
| site_url    | VARCHAR(255) | 是       | 网站 url                   |
| code_url    | VARCHAR(255) | 是       | github url                 |
| description | VARCHAR(255) | 是       | 项目描述                   |
| author_id   | INT(11)      | 否       | 作者 id                    |
| tag_ids     | VARCHAR(255) | 是       | 标签 ids: 1,2,3            |
| views       | INT(11)      | 否       | 浏览量                     |
| collections | INT(11)      | 否       | 收藏量                     |
| top         | INT(11)      | 否       | 顶                         |
| down        | INT(11)      | 否       | 踩                         |
| type        | VARCHAR(36)  | 否       | 类型: `site` `code`        |
| is_show     | INT(2)       | 否       | 是否可用：1-可用，2-不可用 |
| created_at  | TIMESTAMP(6) | 否       | 添加时间                   |
| updated_at  | TIMESTAMP(6) | 否       | 更新时间                   |
