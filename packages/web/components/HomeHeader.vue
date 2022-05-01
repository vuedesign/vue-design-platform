<template>
  <header class="vue-design-header">
    <div class="vue-design-header-wrapper">
      <div class="vue-design-main vue-design-header-top">
        <ul class="vue-design-header-nav">
          <li class="active"><nuxt-link to="/">首页</nuxt-link></li>
          <li><nuxt-link to="/find">发现</nuxt-link></li>
        </ul>
        <ul class="vue-design-header-user">
          <li>
            <div class="vue-design-header-btn vue-design-header-wechat">
              <home-popper arrow placement="bottom">
                <div class="vue-design-header-wechat-title">
                  <wechat theme="outline" size="16" fill="#e1e9ed" />
                  <span class="text">关注公众号</span>
                </div>
                <template #content>
                  <div class="vue-design-header-wechat-popper-content">
                    <img src="/assets/images/wechat.png" />
                  </div>
                </template>
              </home-popper>
            </div>
          </li>
          <li>
            <div class="vue-design-header-btn vue-design-header-recommend">
              <upload-one theme="outline" size="14" fill="#808080" />
              <span class="text">推荐</span>
            </div>
          </li>
          <li>
            <header-avatar />
          </li>
        </ul>
      </div>
      <div class="vue-design-main vue-design-header-logo">
        <img alt="vue.design logo" src="../assets/images/logo.png" />
      </div>
      <div class="vue-design-header-mine">
        <span class="vue-design-header-mine-setting">
          <setting-two theme="outline" size="16" fill="#e1e9ed" />
        </span>
        <ul class="vue-design-header-mine-sites">
          <!-- <li v-for="item in siteList" :key="item.id">
            <a href="#">
              <img :src="item.favicon" />
              <span>{{ item.title }}</span>
            </a>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="vue-design-header-bg"></div>
  </header>
</template>

<script setup lang="ts">
import { Wechat, UploadOne, SettingTwo, Power } from "@icon-park/vue-next";
// import FindHeaderAvatar from "./FindHeaderAvatar.vue";
// import useGlobalStore from '@/store/global';

// const globalStore = useGlobalStore();
// globalStore.findProfile();
</script>

<style lang="scss" scoped>
.vue-design-header {
  width: 100%;
  height: 500px;
  background-color: #ddd;
}
.vue-design-header-bg {
  background-image: url("/assets/images/header_bg.png");
  position: relative;
  z-index: 1;
  height: inherit;
  width: inherit;
  background-repeat: no-repeat;
  background-position: center center;
}
.vue-design-header-wrapper {
  position: absolute;
  z-index: 2;
  height: inherit;
  width: inherit;
  top: 0;
  left: 0;
}
.vue-design-main {
  margin: 0 60px;
}

.vue-design-header-top {
  height: 48px;
  display: flex;
  justify-content: space-between;
}

.vue-design-header-nav {
  a {
    color: rgba(184, 184, 184, 1);
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
  }

  display: flex;

  li {
    display: flex;
    margin-right: 30px;
    align-items: center;
    a:hover {
      color: rgba(61, 126, 255, 1);
    }
    &.active a {
      color: rgba(61, 126, 255, 1);
    }
  }
}

.vue-design-header-user {
  display: flex;
  > li {
    display: flex;
    align-items: center;
    margin-left: 16px;
    color: rgba(225, 233, 237, 1);
  }
}

.vue-design-header-recommend {
  width: 64px;
  height: 24px;
  line-height: 24px;
  background-color: rgba(238, 238, 238, 1);
  border-radius: 24px;
  color: rgba(128, 128, 128, 1);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    font-size: 12px;
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
    &.text {
      margin-left: 5px;
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    span,
    i {
      color: #3d7eff;
    }
  }
}

.vue-design-header-avatar {
  width: 24px;
  height: 24px;
  img.avatar {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}

.vue-design-header-wechat {
  display: flex;
  align-items: center;
}
.vue-design-header-wechat-title {
  display: flex;
  > span {
    display: flex;
    align-items: center;
    &.text {
      margin-left: 5px;
      font-size: 14px;
    }
  }
}

.vue-design-header-btn {
  cursor: pointer;
}

.vue-design-header-logo {
  height: 38px;
  margin-top: 30px;
  img {
    height: inherit;
    width: auto;
    margin: 0 auto;
    display: block;
  }
}

.vue-design-header-mine {
  max-width: 1072px;
  height: 316px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  position: relative;
  padding: 16px;
  margin: 0 auto;
  margin-top: 30px;
}

.vue-design-header-mine-setting {
  position: absolute;
  top: 16px;
  right: 16px;
}

.vue-design-header-mine-sites {
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
  li {
    width: 12.5%;
    padding: 8px 0;

    a {
      color: #fff;
      text-decoration: none;
    }

    img {
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 14px;
      margin-left: 8px;
    }
    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.vue-design-header-popper-content {
  width: 180px;
  height: 320px;
  .user-menu-item {
    display: flex;
    align-items: center;
    > span {
      display: inline-block;
      vertical-align: middle;
      display: flex;
      align-items: center;
      &.text {
        margin-left: 6px;
      }
    }
  }
}
.vue-design-header-wechat-popper-content {
  width: 200px;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
