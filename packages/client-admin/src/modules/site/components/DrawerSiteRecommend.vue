<template>
    <el-drawer
        custom-class="drawer-site-recommend"
        v-model="isVisible"
        :title="title"
        :with-header="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="emit('closed', false)"
    >
        <vd-card scroll>
            <div class="drawer-site-recommend-card">
                <el-form
                    :model="detail"
                    label-position="left"
                    label-width="60px"
                >
                    <el-form-item label="站点ID">
                        <el-input
                            v-model="detail.siteId"
                            class="form-item-width"
                            disabled
                        />
                    </el-form-item>
                    <el-form-item label="Icon">
                        <el-avatar shape="square" :src="detail.iconUrl" />
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input
                            v-model="detail.title"
                            autocomplete="off"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            type="textarea"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input
                            v-model="detail.description"
                            autocomplete="off"
                            :autosize="{ minRows: 2, maxRows: 10 }"
                            type="textarea"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="网站">
                        <el-input
                            v-model="detail.siteUrl"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-switch
                            v-model="detail.status"
                            :active-value="STATUS.AVAILABLE"
                            :inactive-value="STATUS.DISABLE"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="drawer-site-recommend-footer">
                    <el-button class="vd-btn" @click="handleCancelClick">
                        <el-icon>
                            <close-one />
                        </el-icon>
                        <span>取消</span>
                    </el-button>
                    <el-button
                        :disabled="isRecommend"
                        class="vd-btn"
                        type="primary"
                        @click="handleUpdateClick"
                        :loading="loading"
                    >
                        <el-icon>
                            <send />
                        </el-icon>
                        <span>{{ isRecommend ? '已推荐' : '提交' }}</span>
                    </el-button>
                </div>
            </template>
        </vd-card>
    </el-drawer>
</template>
<script lang="ts">
export default {
    name: 'dialog-site-update',
};
</script>
<script lang="ts" setup>
import { WritableComputedRef } from 'vue';
import { Send, CloseOne } from '@icon-park/vue-next';
import { useSiteStore } from '../useSiteStore';
import VdCard from '@/components/VdCard.vue';
import { STATUS } from '@/configs/constants';
import { watting } from '@/utils';
import { useNavigationStore } from '@/modules/navigation/useNavigationStore';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['update:modelValue', 'closed']);
const isVisible: WritableComputedRef<boolean> = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const siteStore = useSiteStore();
const navigationStore = useNavigationStore();
const { detail, isRecommend } = storeToRefs(navigationStore);

const title = '推荐站点';
const loading = ref(false);

const handleUpdateClick = async () => {
    console.log('detail', detail.value);
    loading.value = true;
    await navigationStore.create(detail.value);
    ElNotification({
        title: '编辑',
        message: '编辑站点信息成功',
        type: 'success',
    });
    await watting(1000);
    loading.value = false;
    siteStore.$patch({
        isDrawerRecommendVisible: false,
    });
};

const handleCancelClick = () => {
    ElNotification({
        title: '取消',
        message: '取消推荐站点',
        type: 'info',
    });
    siteStore.$patch({
        isDrawerRecommendVisible: false,
    });
};
</script>

<style scoped lang="scss">
.form-item-width {
    width: 100%;
}
.vd-btn {
    min-width: 80px;
}
</style>
<style lang="scss">
.drawer-site-recommend {
    width: 500px !important;
    background-color: #f2f3f5;
}
.drawer-site-recommend-card {
    box-sizing: border-box;
    width: 100%;
    padding: 24px;
}
.drawer-site-recommend-footer {
    display: flex;
    padding: 16px 24px;
    justify-content: flex-end;
}

.vd-image {
    background-color: var(--el-fill-color-light);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
    &.vd-image-thumb {
        width: 256px;
        height: 128px;
    }
    &.vd-image-logo {
        width: 128px;
        height: 64px;
    }
}
</style>
