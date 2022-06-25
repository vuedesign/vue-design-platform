<template>
  <div class="vue-design-item">
    <div class="vue-design-item-inner">
      <div class="vue-design-item-thumb">
        <a
          href="#"
          :style="{
            backgroundImage: `url(${props.thumb})`
          }"
        ></a>
      </div>
      <div class="vue-design-item-tools">
        <dl>
          <dd>
            <!-- <thumbs-up theme="outline" size="16" fill="#666" /> -->
          </dd>
          <dd>
            <!-- <thumbs-down theme="outline" size="16" fill="#666" /> -->
          </dd>
          <dt>
            <img :src="props.user.avatar" />
          </dt>
          <dd>
            <!-- <like theme="outline" size="16" fill="#666" /> -->
          </dd>
          <dd>
            <!-- <home
              v-if="props.type === 'site'"
              theme="outline"
              size="16"
              fill="#666"
            />
            <github-one
              v-else-if="props.type === 'code'"
              theme="outline"
              size="16"
              fill="#666"
            /> -->
          </dd>
        </dl>
      </div>
      <div class="vue-design-item-info">
        <h5>{{ props.title }}</h5>
        <p>{{ props.description }}</p>
        <div class="vue-design-item-tags">
          <span v-for="t in props.tags" :key="t">
            {{ t }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  GithubOne,
  Home,
  Like,
  ThumbsUp,
  ThumbsDown
} from '@icon-park/vue-next'

interface UserData {
  avatar: string
  username: string
}

type SiteType = 'site' | 'code'

interface Props {
  thumb: string
  id: number
  title: string
  description: string
  tags: string[]
  user: UserData
  type: SiteType
}

const props = withDefaults(defineProps<Props>(), {
  thumb: '',
  id: 0,
  title: '',
  description: '',
  tags: () => [],
  user: () => ({
    avatar: 'string',
    username: 'string'
  }),
  type: 'site'
})
</script>

<style lang="scss" scoped>
.vue-design-item {
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
    .vue-design-item-thumb a {
      opacity: 1;
    }
  }
}

.vue-design-item-inner {
  width: 256px;
  height: 220px;
  position: relative;
}

.vue-design-item-thumb {
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

.vue-design-item-thumb a {
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

.vue-design-item-info {
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
    margin: 0;
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

.vue-design-item-tools {
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

.vue-design-item-tags {
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
