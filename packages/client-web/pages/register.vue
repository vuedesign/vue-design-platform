<template>
  <el-layout-content class="page-regiter">
    <div class="page-regiter-inner">
      <div class="page-regiter-left">
        <div class="page-regiter-left-inner">
          <el-divider orientation="left">注册</el-divider>
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
                  <User />
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
                  <Lock />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="login-item">
              <el-button
                block
                type="primary"
                :disabled="formData.account === '' || formData.password === ''"
                @click="handleRegister"
              >
                注 册
              </el-button>
              <el-button block type="link" @click="handleGotoLogin">
                登 录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="page-regiter-right" />
    </div>
  </el-layout-content>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { User, Lock } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'

const globalStore = useGlobalStore()
const HttpStatus = useHttpStatus()

const formData = reactive({
  account: '18602042482',
  password: 'string'
})

const handleRegister = async () => {
  const res = await globalStore.register(formData)
  if (res && res.status === HttpStatus.CONFLICT) {
    ElMessage.warning(res.error)
    console.log('res', res)
  }
}

const handleGotoLogin = () => {
  navigateTo({
    path: '/login'
  })
}
const wrapperCol = { span: 24 }
</script>

<style scoped lang="scss">
.page-regiter {
  padding: 100px;
}

.page-regiter-inner {
  width: 800px;
  margin: 0 auto;
  display: flex;
  min-height: 300px;
}

.page-regiter-right {
  flex: 1;
}
.page-regiter-left {
  width: 300px;
}

.page-regiter-left-inner {
  border: 1px solid #eee;
  height: 100%;
  padding: 20px 40px 0 40px;
}
</style>
