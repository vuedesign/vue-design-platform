<template>
    <div class="vd-header">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">导航管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>导航列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-header',
};
</script>
<script setup lang="ts"></script>

<style scoped>
.vd-header {
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
