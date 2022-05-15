<template>
    <div class="page-report">
        <var-app-bar title="报表" />
        <div class="page-report-container">report</div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'page-report',
};
</script>
<script lang="ts" setup></script>

<style scoped lang="scss">
.page-report {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-report-container {
    padding: 16px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    li {
    }
}
</style>
