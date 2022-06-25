<template>
  <el-layout-content class="page-login">
    <div class="page-login-inner">
      <div class="page-login-left">
        <div class="page-login-left-inner">
          <div class="ant-divider-with-text" role="separator">
            <span class="ant-divider-inner-text">登录</span>
          </div>
          <el-form
            layout="horizontal"
            :model="formData"
            :wrapper-col="wrapperCol"
          >
            <el-form-item class="login-item">
              <el-input
                v-model:value="formData.account"
                placeholder="用户名/手机号/邮箱"
              >
                <template #prefix>
                  <User style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="login-item">
              <el-input
                v-model:value="formData.password"
                type="password"
                placeholder="密码"
              >
                <template #prefix>
                  <el-icon>
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="login-item">
              <el-button
                block
                type="primary"
                :disabled="formData.account === '' || formData.password === ''"
                @click="handleLogin"
              >
                登 录
              </el-button>
              <el-button block type="link" @click="handleGotoRegister">
                注 册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="page-login-right" />
    </div>
  </el-layout-content>
</template>
<script lang="ts">
export default {
  name: 'login'
}
</script>
<script lang="ts" setup>
import { reactive } from 'vue'
import { User, Lock } from '@icon-park/vue-next'

const globalStore = useGlobalStore()

const formData = reactive({
  account: '18602042482',
  password: 'string'
})

const handleLogin = () => {
  globalStore.login(formData)
}

const handleGotoRegister = () => {
  navigateTo({
    path: '/register'
  })
}

const wrapperCol = reactive({ span: 24 })
</script>

<style scoped lang="scss">
.page-login {
  padding: 100px;
}

.page-login-inner {
  width: 800px;
  margin: 0 auto;
  display: flex;
  min-height: 300px;
}

.page-login-right {
  flex: 1;
}
.page-login-left {
  width: 300px;
}

.page-login-left-inner {
  border: 1px solid #eee;
  height: 100%;
  padding: 20px 40px 0 40px;
}
</style>
<style lang="scss">
.page-login {
  .login-item {
    > div {
      width: 100%;
    }
  }
}
</style>
