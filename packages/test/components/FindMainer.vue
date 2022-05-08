<template>
  <section class="find-mainer">
    <section class="find-mainer-main">
      <div class="find-mainer-nav">
        <ul class="find-mainer-tabs">
          <li class="active"><span>最新</span></li>
          <li><span>推荐</span></li>
        </ul>
        <ul class="find-mainer-tags">
          <li class="active"><span>全部</span></li>
          <li><span>网站</span></li>
          <li><span>代码</span></li>
        </ul>
      </div>
      <ul class="find-mainer-list" v-if="list && list.length">
        <li v-for="item in list" :key="item.id">
          <vue-design-item v-bind="item" />
        </li>
      </ul>
      <a class="find-mainer-more" href="#">发现更多</a>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import VueDesignItem from './VueDesignItem.vue'

interface UserData {
  avatar: string
  username: string
}

type SiteType = 'site' | 'code'

interface ItemData {
  thumb: string
  id: number
  title: string
  description: string
  tags: string[]
  user: UserData
  type: SiteType
}
const list: Ref<ItemData[]> = ref([])

const thumbs = [
  'https://img.js.design/assets/img/6218e8ebde43022e2272024f.png',
  'https://img.js.design/assets/img/6218e1c70570851813332b16.png',
  'https://img.js.design/assets/img/6218e8c8a89b5abda85fb435.png',
  'https://img.js.design/assets/img/6218db403404bb6e3f1c3c31.png',
  'https://img.js.design/assets/img/6219c7573404bbc2661e7ba7.png',
  'https://img.js.design/assets/img/6218e7c660653881e6bd9c18.png',
  'https://img.js.design/assets/img/6218e7fa606538a8e9bd9cfb.png'
]

const types: SiteType[] = ['site', 'code']

new Array(20).fill(0).forEach((item, index) => {
  list.value.push({
    thumb: thumbs[Math.floor(Math.random() * 7)],
    id: index + 1,
    title: '掘金 - 代码不止，掘金不停',
    description:
      '掘金是一个帮助开发者成长的社区,是给开发者用的 Hacker News,给设计师用的 Designer News,和给产品经理用的 Medium。掘金的技术文章由稀土上聚集的技术大牛和极客共同编辑为你筛选出最优质的干货,其中包括：Android、iOS、前端、后端等方面的内容。用户每天都可以在这里找到技术世界的头条内容。与此同时,掘金内还有沸点、掘金翻译计划、线下活动、专栏文章等内容。即使你是 GitHub、StackOverflow、开源中国的用户,我们相信你也可以在这里有所收获。',
    tags: ['掘金', '稀土', 'Vue.js', '前端面试题', 'nginx配置', 'Kotlin'],
    user: {
      avatar: 'https://img.js.design/assets/img/620bae5611acd605d0040287.png',
      username: 'wujian'
    },
    type: types[Math.floor(Math.random() * 2)]
  })
})
</script>

<style lang="scss" scoped>
.find-mainer {
  width: 100%;
  height: auto;
  background-color: #eff3f5;
}

.find-mainer-main {
  //   width: 1072px;
  // 1072 + 8 + 8;
  width: 1088px;
  margin: 0 auto;
  padding-bottom: 16px;
  overflow: hidden;
}

// nav
.find-mainer-nav {
  background-color: #fff;
  min-height: 40px;
  display: flex;
  margin: 0 8px;
  margin-top: 20px;
  overflow: hidden;
  padding: 8px;
}

.find-mainer-tabs,
.find-mainer-tags {
  height: 24px;
  display: flex;
  align-items: center;
  li {
    cursor: pointer;
    span {
      color: #808080;
      display: inline-block;
      padding: 0 12px;
      font-size: 14px;
    }
    &.active {
      span {
        color: #3d7eff;
      }
    }
  }
}

.find-mainer-tabs {
  background-color: #eff3f5;
  border-radius: 2px;
  overflow: hidden;
  li {
    height: 24px;
    display: flex;
    align-items: center;
    &.active {
      background-color: #fff;
      border: 1px solid #eff3f5;
    }
  }
}

.find-mainer-tags {
  height: 24px;
  display: flex;
  margin-left: 12px;
  li {
    margin: 0 4px;
  }
}

.find-mainer-list {
  display: flex;
  padding-top: 18px;
  width: 100%;
  flex-flow: wrap;
  li {
    margin: 0 4px;
    margin-bottom: 8px;
  }
}

.find-mainer-more {
  display: flex;
  width: 528px;
  height: 32px;
  line-height: 32px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  background-color: #e5eaed;
  border-radius: 3px;
  font-size: 14px;
  color: gray;
  &:hover {
    background-color: #fff;
    color: #3d7eff;
  }
}

.find-item {
  width: 264px;
  height: 228px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 3px;
  transition: all 0.3s;
  transform: translateY(0px);
  &:hover {
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.05);
    border: 1px solid #cad7de;
    background-color: rgba(255, 255, 255, 1);
    transform: translateY(-5px);
    .find-item-thumb a {
      opacity: 1;
    }
  }
}

.find-item-inner {
  width: 256px;
  height: 220px;
  position: relative;
}

.find-item-thumb {
  // background
  width: inherit;
  height: 0;
  padding-top: 50%;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  background-color: #e5eaed;
  z-index: 0;
}

.find-item-thumb a {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.find-item-info {
  padding: 18px 8px 8px 8px;
  height: 94px;
  z-index: 0;
  position: relative;
  h5,
  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: rgba(128, 128, 128, 1);
  }
  h5 {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  p {
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    margin-top: 1px;
  }
}

.find-item-tools {
  height: 28px;
  width: 100%;
  top: 114px;
  left: 0;
  position: absolute;
  padding: 0 8px;
  z-index: 3;
  dl {
    display: flex;
    justify-content: space-between;
    width: inherit;
    height: inherit;
    dd,
    dt {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #eff3f5;
      cursor: pointer;
    }
    dt {
      img {
        display: block;
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.find-item-tags {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 4px;
  span {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
    background-color: rgba(225, 233, 237, 1);
    margin-right: 6px;
    border-radius: 2px;
    color: rgba(128, 128, 128, 1);
    font-size: 12px;
  }
}
</style>
