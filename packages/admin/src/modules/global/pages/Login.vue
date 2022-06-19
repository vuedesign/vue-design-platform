<template>
    <div class="page-login">
        <div class="page-login-inner">
            <div class="page-login-left">
                <div class="page-login-left-inner">
                    <el-divider content-position="left">登录</el-divider>
                    <el-form layout="horizontal" :model="formData">
                        <el-form-item class="login-item">
                            <el-input
                                v-model:value="formData.account"
                                placeholder="用户名/手机号/邮箱"
                            >
                                <template #prefix>
                                    <el-icon>
                                        <user />
                                    </el-icon>
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
                                class="btn-block"
                                type="primary"
                                :disabled="
                                    formData.account === '' ||
                                    formData.password === ''
                                "
                                @click="handleLogin"
                            >
                                登 录
                            </el-button>
                        </el-form-item>
                        <el-form-item class="login-item">
                            <el-button
                                class="btn-block"
                                text
                                @click="handleGotoRegister"
                            >
                                注 册
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="page-login-right" />
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'login',
};
</script>
<script lang="ts" setup>
import { User, Lock } from '@icon-park/vue-next';
import { useGlobalStore } from '../useGlobalStore';

const globalStore = useGlobalStore();
const router = useRouter();

const formData = reactive({
    account: 'wujian',
    password: 'string',
});

const handleLogin = () => {
    globalStore.login(formData);
};

const handleGotoRegister = () => {
    router.push({
        path: '/register',
    });
};
</script>

<style scoped lang="scss">
.page-login {
    padding: 100px;
    .btn-block {
        width: 100%;
    }
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
