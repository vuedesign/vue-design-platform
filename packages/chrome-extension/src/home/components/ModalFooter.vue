<template>
    <footer class="vue-design-modal-footer">
        <div class="vue-design-modal-info-logo">
            <span>LOGO</span>
            <img v-if="state.info.logoUrl" :src="state.info.logoUrl" />
        </div>
        <div class="vue-design-modal-footer-btn-group">
            <a-button
                class="vue-design-modal-footer-cancel"
                @click="handleCancel"
            >
                取消
            </a-button>
            <a-button
                class="vue-design-modal-footer-recommend"
                type="primary"
                :loading="state.loading"
                @click="handleRecommend"
            >
                提交推荐
            </a-button>
        </div>
    </footer>
</template>
<script lang="ts">
export default {
    name: 'modal-header',
};
</script>
<script lang="ts" setup>
import useStore, { state } from '../uses/useStore';

const { handleCancel, handleRecommend } = useStore();
</script>

<style scoped lang="scss">
.vue-design-modal-footer {
    width: 100%;
    height: auto;
    display: flex;
    background-color: transparent;
}
.vue-design-modal-footer-btn-group {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}
.vue-design-modal-footer-cancel,
.vue-design-modal-footer-recommend {
    width: 100px;
}

.vue-design-modal-footer-recommend {
    margin-left: 7px;
}
.vue-design-modal-info-logo {
    width: 100px;
    height: 32px;
    border-radius: 3px;
    background-color: #eff3f5;
    display: flex;
    span {
        display: block;
        height: 32px;
        line-height: 32px;
        flex: 1;
        text-align: center;
        color: #aaa;
        font-size: 14px;
    }
    img {
        width: 32px;
        height: 32px;
        object-fit: contain;
        background-color: rgb(229, 234, 237);
    }
}
</style>
