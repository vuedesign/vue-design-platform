<template>
    <div class="vd-card">
        <header v-if="slots.header" class="vd-card-header">
            <slot name="header"></slot>
        </header>
        <section class="vd-card-body"><slot /></section>
        <footer v-if="slots.footer" class="vd-card-footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-card',
};
</script>
<script setup lang="ts">
const slots = useSlots();
</script>

<style scoped>
.vd-card {
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.02);
    width: 100%;
    display: flex;
    flex-direction: column;
}
.vd-card-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    min-height: 64px;
    background-color: #fafbfc;
    border-bottom: 1px solid #f2f3f5;
}
.vd-card-footer {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    min-height: 48px;
    background-color: #fafbfc;
    border-top: 1px solid #f2f3f5;
}

.vd-card-body {
    width: 100%;
    flex: 1;
    display: flex;
}
</style>
