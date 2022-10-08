<template>
    <el-drawer
        v-model="isVisible"
        title="编辑内容"
        :with-header="true"
        custom-class="drawer-config-content-update"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="emit('closed', false)"
    >
        <vd-card>
            <div class="drawer-config-content-update-card">
                <div style="width: 100%; height: 100%">
                    <Editor
                        :value="editorValue"
                        :plugins="plugins"
                        @change="handleEditorChange"
                    />
                    <Viewer />
                </div>
            </div>
            <template #footer>
                <div class="drawer-config-content-update-footer">
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
import { Editor, Viewer } from '@bytemd/vue-next';
import 'bytemd/dist/index.css';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

const plugins = [gfm(), highlight()];

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
const { detail } = storeToRefs(configStore);

const loading = ref(false);

const handleUpdateClick = async () => {
    console.log('detail', detail.value);
    loading.value = true;
    await configStore.update(detail.value);
    loading.value = false;
    configStore.$patch({
        isDrawerContentUpdateVisible: false,
    });
};

const handleCancelClick = () => {
    configStore.$patch({
        isDrawerContentUpdateVisible: false,
    });
};

const editorValue = ref('');
const handleEditorChange = (v: string) => {
    editorValue.value = v;
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
// @import './styles/editor.scss';
.drawer-config-content-update {
    width: calc(100% - 280px) !important;
    background-color: #f2f3f5;
}
.drawer-config-content-update-card {
    width: 100%;
    padding: 24px;
}
.drawer-config-content-update-footer {
    display: flex;
    padding: 16px 24px;
    justify-content: flex-end;
}
</style>
