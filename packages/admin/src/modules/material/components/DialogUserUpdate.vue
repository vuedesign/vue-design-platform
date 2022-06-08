<template>
    <el-dialog
        v-model="isDialogUpdateVisible"
        title="编辑用户信息"
        :width="600"
    >
        <el-form
            :model="detail"
            label-position="left"
            :label-width="formLabelWidth"
        >
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
                <el-button @click="handleClick">取消</el-button>
                <el-button type="primary" @click="handleClick">提交</el-button>
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
import {
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    ElForm,
    ElFormItem,
    ElDialog,
    ElAvatar,
    ElSwitch,
} from 'element-plus';

import useUserStore from '../useUserStore';
import { storeToRefs } from 'pinia';
import { ruleMap } from '../constants';

const userStore = useUserStore();
const { isDialogUpdateVisible, detail } = storeToRefs(userStore);
const formLabelWidth = '60px';
const handleClick = () => {
    isDialogUpdateVisible.value = false;
};
</script>

<style scoped lang="scss">
.form-item-width {
    width: 400px;
}
</style>
