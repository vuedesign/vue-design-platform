<template>
    <a-layout-content class="vue-design-modal-login">
        <div class="vue-design-modal-login-inner">
            <div class="vue-design-modal-login-left">
                <div class="vue-design-modal-login-left-inner">
                    <a-divider orientation="left">登录</a-divider>
                    <a-form
                        layout="horizontal"
                        :model="formData"
                        :wrapper-col="{ span: 24 }"
                    >
                        <a-form-item class="login-item">
                            <a-input
                                v-model:value="formData.account"
                                placeholder="用户名/手机号/邮箱"
                            >
                                <template #prefix>
                                    <UserOutlined
                                        style="color: rgba(0, 0, 0, 0.25)"
                                    />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item class="login-item">
                            <a-input
                                v-model:value="formData.password"
                                type="password"
                                placeholder="密码"
                            >
                                <template #prefix>
                                    <LockOutlined
                                        style="color: rgba(0, 0, 0, 0.25)"
                                    />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item class="login-item">
                            <a-button
                                block
                                type="primary"
                                :disabled="
                                    formData.account === '' ||
                                    formData.password === ''
                                "
                                @click="handleLogin"
                            >
                                登 录
                            </a-button>
                            <a-button
                                block
                                type="link"
                                @click="handleGotoRegister"
                            >
                                去 注 册
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div class="vue-design-modal-login-right" />
        </div>
    </a-layout-content>
</template>
<script lang="ts">
export default {
    name: 'modal-login',
};
</script>
<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import useAuth from '../uses/useAuth';
import { formData } from '../uses/useAuth';

const { handleLogin, handleGotoRegister } = useAuth();
</script>

<style scoped lang="scss">
.vue-design-modal-login {
    button + button {
        margin-left: 0;
    }
    height: 346px;
}

.vue-design-modal-login-inner {
    width: 100%;
    margin: 0 auto;
    display: flex;
    min-height: 300px;
    height: 100%;
}

.vue-design-modal-login-right {
    flex: 1;
}
.vue-design-modal-login-left {
    width: 300px;
    margin: 0 auto;
}

.vue-design-modal-login-left-inner {
    border: 1px solid #eee;
    height: 100%;
    padding: 20px 40px 0 40px;
}
</style>
<style lang="scss">
.vue-design-modal-login {
    .login-item {
        > div {
            width: 100%;
        }
    }
}
</style>
