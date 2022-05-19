<template>
    <div class="vd-card">
        <header class="vd-card-header">
            <slot name="header"></slot>
        </header>
        <slot />
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-card',
};
</script>
<script setup lang="ts"></script>

<style scoped>
.vd-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.02);
}
.vd-card-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    min-height: 64px;
    background-color: #fafbfc;
    border-bottom: 1px solid #f2f3f5;
}
</style>
