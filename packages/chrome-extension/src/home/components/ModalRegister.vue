<template>
    <a-layout-content class="vue-design-modal-regiter">
        <div class="vue-design-modal-regiter-inner">
            <div class="vue-design-modal-regiter-left">
                <div class="vue-design-modal-regiter-left-inner">
                    <a-divider orientation="left">注册</a-divider>
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
                                @click="handleRegister"
                            >
                                注 册
                            </a-button>
                            <a-button
                                block
                                type="link"
                                @click="handleGotoLogin"
                            >
                                去 登 录
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div class="vue-design-modal-regiter-right" />
        </div>
    </a-layout-content>
</template>
<script lang="ts">
export default {
    name: 'modal-register',
};
</script>
<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import useAuth from '../uses/useAuth';
import { formData } from '../uses/useAuth';

const { handleRegister, handleGotoLogin } = useAuth();
</script>

<style scoped lang="scss">
.vue-design-modal-regiter {
    button + button {
        margin-left: 0;
    }
    height: 346px;
    margin-top: 16px;
}

.vue-design-modal-regiter-inner {
    width: 100%;
    margin: 0 auto;
    display: flex;
    min-height: 300px;
}

.vue-design-modal-regiter-right {
    flex: 1;
}
.vue-design-modal-regiter-left {
    width: 300px;
}

.vue-design-modal-regiter-left-inner {
    border: 1px solid #eee;
    height: 100%;
    padding: 20px 40px 0 40px;
}
</style>
