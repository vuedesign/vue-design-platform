<template>
  <header class="find-header">
    <div class="find-header-wrapper">
      <div class="find-main find-header-top find-header-logo">
        <ul class="find-header-nav">
          <li><nuxt-link to="/">首页</nuxt-link></li>
          <li class="active"><nuxt-link to="/find">发现</nuxt-link></li>
        </ul>
        <ul class="find-header-user">
          <li>
            <div class="find-header-btn find-header-wechat">
              <home-popper arrow placement="bottom">
                <div class="find-header-wechat-title">
                  <wechat theme="outline" size="16" fill="#999" />
                  <span class="text">关注公众号</span>
                </div>
                <template #content>
                  <div class="find-header-wechat-popper-content">
                    <img src="../assets/images/wechat.png" />
                  </div>
                </template>
              </home-popper>
            </div>
          </li>
          <li>
            <div class="find-header-btn find-header-recommend">
              <upload-one theme="outline" size="14" fill="#808080" />
              <span class="text">推荐</span>
            </div>
          </li>
          <li>
            <header-avatar />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Wechat, UploadOne } from "@icon-park/vue-next";
</script>

<style lang="scss" scoped>
.find-header {
  width: 100%;
  height: 48px;
  background-color: #fff;
}

.find-header-wrapper {
  position: absolute;
  z-index: 2;
  height: inherit;
  width: inherit;
  top: 0;
  left: 0;
}
.find-main {
  margin: 0 60px;
}

.find-header-top {
  height: 48px;
  display: flex;
  justify-content: space-between;
}

.find-header-nav {
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

.find-header-user {
  display: flex;
  > li {
    display: flex;
    align-items: center;
    margin-left: 16px;
    color: #999;
  }
}

.find-header-recommend {
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

.find-header-wechat {
  display: flex;
  align-items: center;
}
.find-header-wechat-title {
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

.find-header-btn {
  cursor: pointer;
}

.find-header-logo {
  background-image: url(../assets/images/logo.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 24px;
}

.find-header-mine {
  max-width: 1072px;
  height: 316px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  position: relative;
  padding: 16px;
  margin: 0 auto;
  margin-top: 30px;
}

.find-header-mine-setting {
  position: absolute;
  top: 16px;
  right: 16px;
}

.find-header-mine-sites {
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
</style>
