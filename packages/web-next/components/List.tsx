import styles from '../styles/List.module.scss'
import Item from './Item'
import type { SiteItemType, SiteType } from '../types/site.d'

function getPosts() {
  const thumbs = [
    'https://img.js.design/assets/img/6218e8ebde43022e2272024f.png',
    'https://img.js.design/assets/img/6218e1c70570851813332b16.png',
    'https://img.js.design/assets/img/6218e8c8a89b5abda85fb435.png',
    'https://img.js.design/assets/img/6218db403404bb6e3f1c3c31.png',
    'https://img.js.design/assets/img/6219c7573404bbc2661e7ba7.png',
    'https://img.js.design/assets/img/6218e7c660653881e6bd9c18.png',
    'https://img.js.design/assets/img/6218e7fa606538a8e9bd9cfb.png',
    'https://img.js.design/assets/img/6218e8ebde43022e2272024f.png',
    'https://img.js.design/assets/img/6218e1c70570851813332b16.png',
    'https://img.js.design/assets/img/6218e8c8a89b5abda85fb435.png',
    'https://img.js.design/assets/img/6218db403404bb6e3f1c3c31.png',
    'https://img.js.design/assets/img/6219c7573404bbc2661e7ba7.png',
    'https://img.js.design/assets/img/6218e7c660653881e6bd9c18.png',
    'https://img.js.design/assets/img/6218e7fa606538a8e9bd9cfb.png',
    'https://img.js.design/assets/img/6218e8ebde43022e2272024f.png',
    'https://img.js.design/assets/img/6218e1c70570851813332b16.png',
    'https://img.js.design/assets/img/6218e8c8a89b5abda85fb435.png',
    'https://img.js.design/assets/img/6218db403404bb6e3f1c3c31.png',
    'https://img.js.design/assets/img/6219c7573404bbc2661e7ba7.png',
    'https://img.js.design/assets/img/6218e7c660653881e6bd9c18.png',
    'https://img.js.design/assets/img/6218e7fa606538a8e9bd9cfb.png'
  ]

  const types: SiteType[] = ['site', 'code']
  const posts: SiteItemType[] = []
  new Array(20).fill(0).forEach((item, index) => {
    posts.push({
      thumb: thumbs[index],
      id: index + 1,
      title: '掘金 - 代码不止，掘金不停',
      description:
        '掘金是一个帮助开发者成长的社区,是给开发者用的 Hacker News,给设计师用的 Designer News,和给产品经理用的 Medium。掘金的技术文章由稀土上聚集的技术大牛和极客共同编辑为你筛选出最优质的干货,其中包括：Android、iOS、前端、后端等方面的内容。用户每天都可以在这里找到技术世界的头条内容。与此同时,掘金内还有沸点、掘金翻译计划、线下活动、专栏文章等内容。即使你是 GitHub、StackOverflow、开源中国的用户,我们相信你也可以在这里有所收获。',
      tags: ['掘金', '稀土', 'Vue.js', '前端面试题', 'nginx配置', 'Kotlin'],
      user: {
        avatar: 'https://img.js.design/assets/img/620bae5611acd605d0040287.png',
        username: 'wujian'
      },
      type: types[0]
    })
  })
  return posts
}

const List = () => {
  const posts = getPosts()
  return (
    <section className={styles.container}>
      <section className={styles.main}>
        <ul className={styles.list}>
          {posts.map((item, index) => (
            <li key={index}>
              <Item {...item}></Item>
            </li>
          ))}
        </ul>
        <a className={styles.more}>发现更多</a>
      </section>
    </section>
  )
}

export default List
