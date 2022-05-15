<template>
    <div>login</div>
</template>
<script lang="ts">
export default {
    name: 'login',
};
</script>
<script lang="ts" setup>
import { reactive, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
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
