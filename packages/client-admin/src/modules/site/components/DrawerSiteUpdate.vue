<template>
    <el-drawer
        custom-class="drawer-site-update"
        v-model="isVisible"
        :title="title"
        :with-header="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="emit('closed', false)"
    >
        <vd-card is-scroll>
            <div class="drawer-site-update-card">
                <el-form
                    :model="detail"
                    label-position="left"
                    label-width="60px"
                >
                    <el-divider content-position="left">基础</el-divider>
                    <el-form-item label="状态">
                        <el-switch
                            v-model="detail.status"
                            :active-value="STATUS.AVAILABLE"
                            :inactive-value="STATUS.DISABLE"
                        />
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-tag>{{ typeMap.get(detail.type) }}</el-tag>
                    </el-form-item>
                    <el-divider content-position="left">Meta</el-divider>
                    <el-form-item label="缩略图">
                        <el-image
                            :src="detail.thumbUrl"
                            fit="cover"
                            class="vd-image vd-image-thumb"
                        />
                    </el-form-item>
                    <el-form-item label="Logo">
                        <el-image
                            :src="detail.logoUrl"
                            fit="contain"
                            class="vd-image vd-image-logo"
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
                    <el-form-item label="代码">
                        <el-input
                            v-model="detail.codeUrl"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-input
                            v-model="detail.tagIds"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>

                    <el-divider content-position="left">统计</el-divider>
                    <el-form-item label="浏览量">
                        <el-input
                            disabled
                            v-model="detail.views"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="收藏量">
                        <el-input
                            disabled
                            v-model="detail.collections"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="顶">
                        <el-input
                            disabled
                            v-model="detail.top"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="踩">
                        <el-input
                            disabled
                            v-model="detail.down"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="drawer-site-update-footer">
                    <el-button class="vd-btn" @click="handleCancelClick">
                        <el-icon>
                            <close-one />
                        </el-icon>
                        <span>取消</span>
                    </el-button>
                    <el-button
                        class="vd-btn"
                        type="primary"
                        @click="handleUpdateClick"
                        :loading="loading"
                    >
                        <el-icon>
                            <send />
                        </el-icon>
                        <span>提交</span>
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
import { typeMap } from '../constants';
import VdCard from '@/components/VdCard.vue';
import { STATUS } from '@/configs/constants';
import { watting } from '@/utils';

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
const { detail } = storeToRefs(siteStore);

const title = '编辑站点信息';
const loading = ref(false);

const handleUpdateClick = async () => {
    console.log('detail', detail.value);
    loading.value = true;
    await siteStore.update(detail.value);
    loading.value = false;
    ElNotification({
        title: '编辑',
        message: '编辑站点信息成功',
        type: 'success',
    });
    await watting(1000);
    siteStore.$patch({
        isDrawerUpdateVisible: false,
    });
};

const handleCancelClick = () => {
    emit('update:modelValue', false);
    // alert(1);
    ElNotification({
        title: '取消',
        message: '取消编辑站点信息',
        type: 'info',
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
.drawer-site-update {
    width: 500px !important;
    background-color: #f2f3f5;
}
.drawer-site-update-card {
    box-sizing: border-box;
    width: 100%;
    padding: 24px;
}
.drawer-site-update-footer {
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
