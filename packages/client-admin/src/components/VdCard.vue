<template>
    <div class="vd-card">
        <header v-if="slots.header" class="vd-card-header">
            <slot name="header"></slot>
        </header>
        <el-scrollbar v-if="isScroll">
            <section class="vd-card-body" :style="bodyStyle">
                <slot />
            </section>
        </el-scrollbar>
        <section v-else class="vd-card-body" :style="bodyStyle">
            <slot />
        </section>
        <footer v-if="slots.footer" class="vd-card-footer">
            <slot name="footer"></slot>
        </footer>
        <footer v-else-if="slots.pagination" class="vd-card-pagination">
            <slot name="pagination"></slot>
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

interface Props {
    isScroll?: boolean;
    padding?: boolean | string;
}

const props = withDefaults(defineProps<Props>(), {
    isScroll: false,
    padding: false,
});

const bodyStyle = computed(() => {
    if (props.padding) {
        return {
            padding: props.padding === true ? '16px 24px' : props.padding,
        };
    }
});
</script>

<style scoped lang="scss">
.vd-card {
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.vd-card-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: auto;
    background-color: #fafbfc;
    border-bottom: 1px solid var(--el-color-primary-light-7);
}
.vd-card-footer {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #fafbfc;
    border-top: 1px solid #f2f3f5;
}

.vd-card-pagination {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    // background-color: #fafbfc;
    padding: 12px 24px;
    display: flex;
    justify-content: flex-end;
}

.vd-card-body {
    width: 100%;
    flex: 1;
    display: flex;
    overflow: hidden;
    &.is-scroll {
        overflow-y: auto;
    }
}
</style>
