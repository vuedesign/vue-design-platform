<template>
  <div class="header-btn header-avatar" v-if="profile && profile.id">
    <home-popper arrow placement="bottom-end">
      <a-avatar size="small" :src="profile.avatar">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <!-- <img class="avatar" :src="profile.avatar" /> -->
      <template #content>
        <div class="header-popper-content">
          <dl>
            <dt>
              <a-avatar :size="48" :src="profile.avatar">
                <template #icon><UserOutlined /></template>
              </a-avatar>
              <!-- <img class="avatar" :src="profile.avatar" /> -->
            </dt>
            <dd>
              <h4>
                {{
                  profile.username ||
                  profile.nickname ||
                  profile.email ||
                  profile.phone
                }}
              </h4>
              <p>{{ profile.email }}</p>
            </dd>
          </dl>
          <ul>
            <li class="user-menu-item" @click="handleUpload">
              <upload-one theme="outline" />
              <span class="text">我的上传</span>
            </li>
            <li class="user-menu-item">
              <like theme="outline" />
              <span class="text">我的收藏</span>
            </li>
            <li class="user-menu-item">
              <setting-two theme="outline" />
              <span class="text">设置信息</span>
            </li>
          </ul>
          <ul>
            <li class="user-menu-item" @click="handleLogout">
              <power theme="outline" />
              <span class="text">退出登录</span>
            </li>
          </ul>
        </div>
      </template>
    </home-popper>
  </div>
  <div v-else>登录/注册</div>
</template>

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
import { SettingTwo, Power, UploadOne, Like } from '@icon-park/vue-next'
// import { Avatar } from 'ant-design-vue'
const globalStore = useGlobalStore()
const { data: profile, pending } = await globalStore.findProfile()
const handleUpload = () => {
  navigateTo({
    path: '/mine'
  })
}
const handleLogout = () => {
  globalStore.logout()
}
</script>

<style lang="scss">
.header-avatar {
  width: 24px;
  height: 24px;
  img.avatar {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}
.header-popper-content {
  width: 240px;
  height: auto;
  > dl {
    display: flex;
    padding: 16px;
    dt {
      padding-right: 12px;
    }
    dd {
      flex: 1;
      > p {
        color: #999;
      }
    }
    .avatar {
      display: block;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  > ul {
    border-top: 1px solid #cad7de;
    padding: 8px 0;
    > li {
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: #dde8ff;
      }
    }
  }
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
.header-wechat-popper-content {
  width: 200px;
  height: auto;
  padding: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
