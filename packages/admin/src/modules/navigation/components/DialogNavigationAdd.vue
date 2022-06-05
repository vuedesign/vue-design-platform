<template>
    <el-dialog v-model="isDialogAddVisible" :title="title" :width="600">
        <el-table
            :data="siteList"
            stripe
            style="width: 100%"
            :key="tabelMaxheight"
            :height="tabelMaxheight"
            :header-cell-style="headerCellStyle"
        >
            <el-table-column prop="id" label="ID" width="48" />
            <el-table-column label="头像" width="64">
                <template #default="scope">
                    <el-avatar
                        shape="square"
                        :size="40"
                        :src="scope.row.avatar"
                        style="display: block"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="200" />
            <el-table-column prop="phone" label="电话" width="120" />
            <el-table-column prop="nickname" label="昵称" width="100" />
            <el-table-column prop="username" label="用户名" width="100" />
            <el-table-column label="状态" width="80">
                <template #default="scope">
                    <el-tag v-if="scope.row.status === STATUS.AVAILABLE">
                        {{
                            statusMap.get(scope.row.status || STATUS.AVAILABLE)
                        }}
                    </el-tag>
                    <el-tag v-else type="info">
                        {{ statusMap.get(scope.row.status || STATUS.DISABLE) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="角色" width="100">
                <template #default="scope">
                    {{ ruleMap.get(scope.row.rule) }}
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="注册时间" width="200" />
            <el-table-column prop="updatedAt" label="登录时间" width="200" />
            <el-table-column fixed="right" label="操作" width="210">
                <template #default="{ row }">
                    <span class="btn-switch">
                        <el-switch
                            v-model="row.status"
                            :active-value="STATUS.AVAILABLE"
                            :inactive-value="STATUS.DISABLE"
                        />
                    </span>
                    <el-button
                        type="primary"
                        text
                        @click="handleUpdate(row.id)"
                    >
                        编辑
                    </el-button>
                    <el-button type="primary" text @click="handleDel(row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
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
import useNavigationStore from '../useNavigationStore';
import { ruleMap } from '../constants';

const navigationStore = useNavigationStore();
const { isDialogAddVisible, detail } = storeToRefs(navigationStore);

const headerCellStyle = () => {
    return {
        backgroundColor: '#ecf2ff',
    };
};

const title = computed(() => {
    return '新增用户';
});

const siteList = ref([]);

const loading = ref(false);

const handleUpdateClick = async () => {
    console.log('detail', detail.value);
    loading.value = true;
    // await navigationStore.create(detail.value);
    loading.value = false;
    // navigationStore.$patch({
    //     isDialogUpdateVisible: false,
    // });
};

const handleCancelClick = () => {
    // navigationStore.$patch({
    //     isDialogUpdateVisible: false,
    // });
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
