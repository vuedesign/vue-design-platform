<template>
    <el-config-provider :locale="zhCn">
        <router-view />
    </el-config-provider>
</template>

<script lang="ts">
export default {
    name: 'app',
};
</script>
<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
</script>

<style lang="scss">
html,
body {
    overflow: hidden;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    display: flex;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul,
ol,
li {
    list-style: none;
    margin: 0;
    padding: 0;
}
.vd--design {
    .el-dialog__header {
        background-color: #fafbfc;
        border-bottom: 1px solid #f2f3f5;
        margin-right: 0;
        padding-right: 16px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding: 16px 24px;
    }
    .el-dialog__title {
        font-size: 16px;
        line-height: 22px;
    }
    .el-dialog__headerbtn {
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 4px;
    }
}
</style>
