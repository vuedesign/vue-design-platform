<template>
    <div class="vd-card">
        <header v-if="slots.header" class="vd-card-header">
            <slot name="header"></slot>
        </header>
        <el-scrollbar v-if="scroll" height="100%" ref="vdCardRef">
            <slot :height="cardBodyHeight" />
        </el-scrollbar>
        <section v-else class="vd-card-body" ref="vdCardRef">
            <slot :height="cardBodyHeight" />
        </section>
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
import { Ref } from 'vue';
const slots = useSlots();

interface Props {
    scroll?: boolean;
}
withDefaults(defineProps<Props>(), {
    scroll: false,
});

const vdCardRef: Ref<HTMLDivElement | null> = ref(null);
const cardBodyHeight = ref(0);

onMounted(() => {
    if (vdCardRef.value && vdCardRef.value.clientHeight) {
        cardBodyHeight.value = vdCardRef.value.clientHeight;
    }
});
</script>

<style scoped lang="scss">
.vd-card {
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.02);
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
}
.vd-card-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: auto;
    background-color: #fafbfc;
    /* border-bottom: 1px solid #f2f3f5; */
    border-bottom: 1px solid var(--el-color-primary-light-7);
}
.vd-card-footer {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #fafbfc;
    border-top: 1px solid #f2f3f5;
}

.vd-card-body {
    width: 100%;
    flex: 1;
    display: flex;
    overflow-x: hidden;
}
</style>
