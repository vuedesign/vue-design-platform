<template>
    <div class="page-mine">
        <var-app-bar title="我的" />
        <div class="page-mine-container">mine</div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'page-mine',
};
</script>
<script lang="ts" setup></script>

<style scoped lang="scss">
.page-mine {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-mine-container {
    padding: 16px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    li {
    }
}
</style>
