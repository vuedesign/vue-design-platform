<template>
    <vd-card class="page-user">
        <template #header>
            <div class="page-user-header">
                <div class="page-user-filter">
                    <el-input
                        v-model="filter.search"
                        placeholder="请输入用户名或电话"
                        style="width: 200px"
                    >
                        <template #prefix>
                            <el-icon>
                                <iconpark-icon name="search"></iconpark-icon>
                            </el-icon>
                        </template>
                    </el-input>
                    <el-select v-model="filter.rule" placeholder="Select">
                        <template #prefix>
                            <el-icon>
                                <iconpark-icon
                                    name="user-business"
                                ></iconpark-icon>
                            </el-icon>
                        </template>
                        <el-option
                            v-for="[key, value] in ruleMap"
                            :key="key"
                            :label="value"
                            :value="key"
                        />
                    </el-select>
                    <el-select v-model="filter.status" placeholder="Select">
                        <template #prefix>
                            <el-icon>
                                <iconpark-icon name="broadcast"></iconpark-icon>
                            </el-icon>
                        </template>
                        <el-option
                            v-for="[key, value] in statusMap"
                            :key="key"
                            :label="value"
                            :value="key"
                        />
                    </el-select>
                    <el-button
                        class="vd-btn"
                        type="primary"
                        @click="handleSearch"
                    >
                        <el-icon>
                            <iconpark-icon name="filter"></iconpark-icon>
                        </el-icon>
                        <span>搜索</span>
                    </el-button>
                </div>
                <div class="page-user-btn-group">
                    <el-button
                        class="vd-btn"
                        type="success"
                        @click="handleCreate"
                    >
                        <el-icon>
                            <iconpark-icon name="add-user"></iconpark-icon>
                        </el-icon>
                        <span>新增</span>
                    </el-button>
                </div>
            </div>
        </template>
        <template #default>
            <div class="page-user-container" ref="pageContainer">
                <el-table
                    :data="list"
                    stripe
                    style="width: 100%"
                    :key="tabelMaxheight"
                    :max-height="tabelMaxheight"
                    :header-cell-style="headerCellStyle"
                >
                    <el-table-column prop="id" label="ID" width="48" />
                    <el-table-column label="头像" width="64">
                        <template #default="scope">
                            <el-avatar
                                shape="square"
                                :size="40"
                                :src="scope.row.avatar"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" width="200" />
                    <el-table-column prop="phone" label="电话" width="120" />
                    <el-table-column prop="nickname" label="昵称" width="100" />
                    <el-table-column
                        prop="username"
                        label="用户名"
                        width="100"
                    />
                    <el-table-column label="状态" width="80">
                        <template #default="scope">
                            <el-tag
                                v-if="scope.row.isShow === STATUS.AVAILABLE"
                            >
                                {{
                                    statusMap.get(
                                        scope.row.isShow || STATUS.AVAILABLE,
                                    )
                                }}
                            </el-tag>
                            <el-tag v-else type="info">
                                {{
                                    statusMap.get(
                                        scope.row.isShow || STATUS.DISABLE,
                                    )
                                }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="角色" width="100">
                        <template #default="scope">
                            {{ ruleMap.get(scope.row.rule) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createdAt"
                        label="注册时间"
                        width="200"
                    />
                    <el-table-column
                        prop="updatedAt"
                        label="登录时间"
                        width="200"
                    />
                    <el-table-column fixed="right" label="操作" width="210">
                        <template #default="{ row }">
                            <span class="btn-switch">
                                <el-switch
                                    v-model="row.isShow"
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
                            <el-button
                                type="primary"
                                text
                                @click="handleDel(row.id)"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <dialog-user-update />
        </template>
        <template #footer>
            <div class="page-user-pagination">
                <el-pagination
                    small
                    background
                    layout="prev, pager, next"
                    :total="total"
                    v-model:page-size="filter.size"
                    v-model:current-page="filter.page"
                />
            </div>
        </template>
    </vd-card>
</template>
<script lang="ts">
export default {
    name: 'user-index',
};
</script>
<script lang="ts" setup>
import VdCard from '../../globals/components/VdCard.vue';
import useUserStore from '../useUserStore';
import { STATUS, statusMap, ruleMap } from '../constants';
import DialogUserUpdate from '../components/DialogUserUpdate.vue';

import { useTableMaxHeight } from '../../../utils/useTable';

const userStore = useUserStore();
const pageContainer = ref(document.createElement('div'));
const tabelMaxheight = useTableMaxHeight(pageContainer);

const headerCellStyle = () => {
    return {
        backgroundColor: '#ecf2ff',
    };
};

const { filter, total, list } = storeToRefs(userStore);

userStore.find(filter.value);

const handleSearch = () => {
    userStore.find(filter.value);
};
const handleUpdate = (id: number) => {
    userStore.openDialogUser('update', id);
};
const handleDel = (id: number) => {
    console.log('id', id);
    userStore.openDialogUser('delete', id);
};
const handleCreate = () => {
    userStore.openDialogUser('create');
};
</script>

<style scoped lang="scss">
.page-user {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-user-header {
    display: flex;
    padding: 16px 24px;
}
.page-user-filter {
    flex: 1;
    .el-input,
    .el-select,
    .el-button {
        vertical-align: middle;
        margin-right: 12px;
    }
}
.page-user-btn-group {
    width: auto;
}
.vd-btn {
    width: 80px;
}
.page-user-container {
    padding: 16px 24px 0;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: -1px;
}

.btn-switch {
    margin-right: 12px;
}

.page-user-pagination {
    height: 32px;
    display: flex;
    justify-content: flex-end;
    padding: 8px 24px;
}
</style>
