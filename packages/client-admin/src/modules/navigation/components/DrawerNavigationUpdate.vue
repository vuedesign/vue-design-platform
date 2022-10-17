<template>
    <el-drawer
        v-model="isVisible"
        :title="title"
        :with-header="true"
        custom-class="drawer-navigation-update"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="emit('closed', false)"
    >
        <vd-card is-scroll>
            <div class="drawer-navigation-update-card">
                <el-form
                    :model="detail"
                    label-position="left"
                    label-width="60px"
                >
                    <el-divider content-position="left">基础---</el-divider>

                    <el-form-item label="Icon">
                        <el-avatar shape="square" :src="detail.iconUrl" />
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input
                            v-model="detail.title"
                            autocomplete="off"
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
                    <el-form-item label="排序">
                        <el-input-number
                            v-model="detail.order"
                            autocomplete="off"
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
                <div class="drawer-navigation-update-footer">
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
    name: 'dialog-navigation-update',
};
</script>
<script lang="ts" setup>
import { WritableComputedRef } from 'vue';
import { STATUS } from '@/configs/constants';
import { useNavigationStore } from '../useNavigationStore';
import VdCard from '@/components/VdCard.vue';
import { Send, CloseOne } from '@icon-park/vue-next';

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

const navigaitonStore = useNavigationStore();
const { detail } = storeToRefs(navigaitonStore);

const title = computed(() => {
    return '编辑用户信息';
});

const loading = ref(false);

const handleUpdateClick = async () => {
    console.log('detail', detail.value);
    loading.value = true;
    navigaitonStore.update(detail.value);
    loading.value = false;
    navigaitonStore.$patch({
        isDrawerUpdateVisible: false,
    });
};

const handleCancelClick = () => {
    navigaitonStore.$patch({
        isDrawerUpdateVisible: false,
    });
};

onMounted(() => {
    console.warn('DrawerNavigationUpdate: onMounted');
});
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
.drawer-navigation-update {
    width: 500px !important;
    background-color: #f2f3f5;
}
.drawer-navigation-update-card {
    width: 100%;
    padding: 24px;
}
.drawer-navigation-update-footer {
    display: flex;
    padding: 16px 24px;
    justify-content: flex-end;
}
</style>
