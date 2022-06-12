<template>
    <el-drawer
        v-model="isDrawerUpdateVisible"
        :title="title"
        :with-header="true"
        custom-class="drawer-user-update"
        modal
    >
        <vd-card>
            <div class="drawer-user-update-card">
                <el-form
                    :model="detail"
                    label-position="left"
                    label-width="60px"
                >
                    <el-divider content-position="left">用户信息</el-divider>
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
                    <el-divider content-position="left">用户属性</el-divider>
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
            </div>
            <template #footer>
                <div class="drawer-user-update-footer">
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
                </div>
            </template>
        </vd-card>
    </el-drawer>
</template>
<script lang="ts">
export default {
    name: 'dialog-user-update',
};
</script>
<script lang="ts" setup>
import { useUserStore } from '../useUserStore';
import { ruleMap } from '../constants';
import VdCard from '@/components/VdCard.vue';

const userStore = useUserStore();
const { isDrawerUpdateVisible, detail, drawerType } = storeToRefs(userStore);

const title = computed(() => {
    if (drawerType.value === 'create') {
        return '新增用户';
    } else if (drawerType.value === 'update') {
        return '编辑用户信息';
    }
});

const loading = ref(false);

const handleUpdateClick = async () => {
    console.log('detail', detail.value);
    loading.value = true;
    if (drawerType.value === 'create') {
        await userStore.create(detail.value);
    } else if (drawerType.value === 'update') {
        await userStore.update(detail.value);
    }
    loading.value = false;
    userStore.$patch({
        isDrawerUpdateVisible: false,
    });
};

const handleCancelClick = () => {
    userStore.$patch({
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
.drawer-user-update {
    width: 500px !important;
    background-color: #f2f3f5;
}
.drawer-user-update-card {
    width: 100%;
    padding: 24px;
}
.drawer-user-update-footer {
    display: flex;
    padding: 16px 24px;
    justify-content: flex-end;
}
</style>
