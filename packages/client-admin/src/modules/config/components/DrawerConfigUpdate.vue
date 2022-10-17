<template>
    <el-drawer
        v-model="isVisible"
        :title="title"
        :with-header="true"
        custom-class="drawer-config-update"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="emit('closed', false)"
    >
        <vd-card is-scroll>
            <div class="drawer-config-update-card">
                <el-form
                    :model="detail"
                    label-position="left"
                    label-width="60px"
                >
                    <el-form-item label="配置键">
                        <el-input
                            v-model="detail.key"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="配置值">
                        <el-input
                            v-model="detail.value"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="分组">
                        <el-input
                            v-model="detail.group"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input
                            v-model="detail.order"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input
                            v-model="detail.link"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-switch
                            v-model="detail.status"
                            :active-value="1"
                            :inactive-value="2"
                        />
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input
                            v-model="detail.remark"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="drawer-config-update-footer">
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
    name: 'dialog-config-update',
};
</script>
<script lang="ts" setup>
import { WritableComputedRef } from 'vue';
import { Send, CloseOne } from '@icon-park/vue-next';
import useConfigStore from '../useConfigStore';
import VdCard from '@/components/VdCard.vue';

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

const configStore = useConfigStore();
const { detail, drawerType } = storeToRefs(configStore);

const title = computed(() => {
    if (drawerType.value === 'create') {
        return '新增配置';
    } else if (drawerType.value === 'update') {
        return '编辑配置信息';
    }
});

const loading = ref(false);

const handleUpdateClick = async () => {
    loading.value = true;
    if (drawerType.value === 'create') {
        await configStore.create(detail.value);
    } else if (drawerType.value === 'update') {
        await configStore.update(detail.value);
    }
    loading.value = false;
    configStore.$patch({
        isDrawerUpdateVisible: false,
    });
};

const handleCancelClick = () => {
    configStore.$patch({
        isDrawerUpdateVisible: false,
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
.drawer-config-update {
    width: 500px !important;
    background-color: #f2f3f5;
}
.drawer-config-update-card {
    width: 100%;
    padding: 24px;
}
.drawer-config-update-footer {
    display: flex;
    padding: 16px 24px;
    justify-content: flex-end;
}
</style>
