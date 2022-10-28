<template>
    <el-drawer
        v-model="isVisible"
        :title="title"
        :with-header="true"
        custom-class="drawer-update"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="emit('closed', false)"
    >
        <vd-card is-scroll>
            <div class="drawer-update-card">
                <el-form
                    :model="detail"
                    label-position="left"
                    label-width="80px"
                >
                    <el-form-item label="标签ID">
                        <el-input
                            disabled
                            v-model="detail.id"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="标签名称">
                        <el-input
                            disabled
                            v-model="detail.name"
                            autocomplete="off"
                            class="form-item-width"
                        />
                    </el-form-item>
                    <el-form-item label="标签描述">
                        <el-input
                            v-model="detail.description"
                            autocomplete="off"
                            class="form-item-width"
                            :autosize="{ minRows: 3, maxRows: 10 }"
                            type="textarea"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="drawer-update-footer">
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
    name: 'dialog-tag-update',
};
</script>
<script lang="ts" setup>
import { WritableComputedRef } from 'vue';
import { Send, CloseOne } from '@icon-park/vue-next';
import useTagStore from '../useTagStore';
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

const tagStore = useTagStore();
const { detail, drawerType } = storeToRefs(tagStore);

const title = computed(() => {
    return '编辑标签信息';
});

const loading = ref(false);

const handleUpdateClick = async () => {
    loading.value = true;
    if (drawerType.value === 'update') {
        await tagStore.update(detail.value);
    }
    loading.value = false;
    tagStore.$patch({
        isDrawerUpdateVisible: false,
    });
};

const handleCancelClick = () => {
    tagStore.$patch({
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
.drawer-update {
    width: 500px !important;
    background-color: #f2f3f5;
}
.drawer-update-card {
    width: 100%;
    padding: 24px;
}
.drawer-update-footer {
    display: flex;
    padding: 16px 24px;
    justify-content: flex-end;
}
</style>
