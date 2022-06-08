<template>
    <el-dialog v-model="isDialogUpdateVisible" :title="title" :width="600">
        <el-form :model="detail" label-position="left" label-width="60px">
            <el-form-item label="头像">
                <el-avatar :src="detail.avatar" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input
                    v-model="detail.email"
                    autocomplete="off"
                    class="form-item-width"
                />
            </el-form-item>
            <el-form-item label="电话">
                <el-input
                    v-model="detail.phone"
                    autocomplete="off"
                    class="form-item-width"
                />
            </el-form-item>
            <el-form-item label="名称">
                <el-input
                    v-model="detail.nickname"
                    autocomplete="off"
                    class="form-item-width"
                />
            </el-form-item>
            <el-form-item label="昵称">
                <el-input
                    v-model="detail.username"
                    autocomplete="off"
                    class="form-item-width"
                />
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                    v-model="detail.isShow"
                    :active-value="1"
                    :inactive-value="2"
                />
            </el-form-item>
            <el-form-item label="角色">
                <el-select
                    v-model="detail.rule"
                    placeholder="Please select a zone"
                >
                    <el-option
                        v-for="[key, value] in ruleMap"
                        :key="key"
                        :label="value"
                        :value="key"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="vd-btn" @click="handleCancelClick">
                    <el-icon>
                        <iconpark-icon name="close-one"></iconpark-icon>
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
                        <iconpark-icon name="send"></iconpark-icon>
                    </el-icon>
                    <span>提交</span>
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
export default {
    name: 'dialog-user-update',
};
</script>
<script lang="ts" setup>
import { useUserStore } from '../useUserStore';
import { ruleMap } from '../constants';

const userStore = useUserStore();
const { isDialogUpdateVisible, detail, dialogType } = storeToRefs(userStore);

const title = computed(() => {
    if (dialogType.value === 'create') {
        return '新增用户';
    } else if (dialogType.value === 'update') {
        return '编辑用户信息';
    }
});

const loading = ref(false);

const handleUpdateClick = async () => {
    console.log('detail', detail.value);
    loading.value = true;
    if (dialogType.value === 'create') {
        await userStore.create(detail.value);
    } else if (dialogType.value === 'update') {
        await userStore.update(detail.value);
    }
    loading.value = false;
    userStore.$patch({
        isDialogUpdateVisible: false,
    });
};

const handleCancelClick = () => {
    userStore.$patch({
        isDialogUpdateVisible: false,
    });
};
</script>

<style scoped lang="scss">
.form-item-width {
    width: 400px;
}
.vd-btn {
    min-width: 80px;
}
</style>
