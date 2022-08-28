<template>
    <vd-card is-scroll>
        <template #header>
            <vd-filter>
                <template #default>
                    <el-input
                        placeholder="请输入用户名或电话"
                        clearable
                        style="width: 211px"
                        v-model="filter.search"
                        @keyup.enter="handleSearch"
                        @clear="handleSearch"
                    >
                        <template #prefix>
                            <el-icon>
                                <search />
                            </el-icon>
                        </template>
                    </el-input>
                    <el-select
                        clearable
                        v-model="filter.rule"
                        @change="handleSearch"
                    >
                        <template #prefix>
                            <el-icon>
                                <user-business />
                            </el-icon>
                        </template>
                        <el-option
                            v-for="[key, value] in ruleMap"
                            :key="key"
                            :label="value"
                            :value="key"
                        />
                    </el-select>
                    <el-select
                        clearable
                        v-model="filter.status"
                        @change="handleSearch"
                    >
                        <template #prefix>
                            <el-icon>
                                <broadcast />
                            </el-icon>
                        </template>
                        <el-option
                            v-for="[key, value] in statusMap"
                            :key="key"
                            :label="value"
                            :value="key"
                        />
                    </el-select>
                    <el-button type="primary" @click="handleSearch">
                        <el-icon>
                            <icon-filter />
                        </el-icon>
                        <span>搜索</span>
                    </el-button>
                </template>
                <template #right>
                    <el-button type="success" @click="handleCreate">
                        <el-icon>
                            <add-user />
                        </el-icon>
                        <span>新增</span>
                    </el-button>
                </template>
            </vd-filter>
        </template>
        <template #default>
            <el-table
                :data="list"
                stripe
                style="width: 100%"
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
                                statusMap.get(
                                    scope.row.status || STATUS.AVAILABLE,
                                )
                            }}
                        </el-tag>
                        <el-tag v-else type="info">
                            {{
                                statusMap.get(
                                    scope.row.status || STATUS.DISABLE,
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
                    label="创建时间"
                    width="160"
                    :formatter="tableDateFormatter('createdAt')"
                />
                <el-table-column
                    prop="updatedAt"
                    label="更改时间"
                    width="160"
                    :formatter="tableDateFormatter('updatedAt')"
                />
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
            <vd-popup v-model="isDrawerUpdateVisible">
                <drawer-user-update />
            </vd-popup>
        </template>
        <template #pagination>
            <el-pagination
                small
                background
                :layout="PAGINATION_LAYOUT"
                :total="total"
                v-model:page-size="filter.size"
                v-model:current-page="filter.page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </template>
    </vd-card>
</template>
<script lang="ts">
export default {
    name: 'user-list',
};
</script>
<script lang="ts" setup>
import {
    Search,
    UserBusiness,
    Broadcast,
    Filter as IconFilter,
    AddUser,
} from '@icon-park/vue-next';
import { STATUS, statusMap, PAGINATION_LAYOUT } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { tableDateFormatter } from '@/utils/useTable';
import VdCard from '@/components/VdCard.vue';
import VdFilter from '@/components/VdFilter';
import VdPopup from '@/components/VdPopup';
import { useUserStore } from '../useUserStore';
import { ruleMap } from '../constants';
import DrawerUserUpdate from '../components/DrawerUserUpdate.vue';

const userStore = useUserStore();
const { filter, total, list, isDrawerUpdateVisible } = storeToRefs(userStore);

userStore.find(filter.value);

const handleSearch = () => {
    userStore.find(filter.value);
};
const handleUpdate = (id: number) => {
    userStore.openDrawerUser('update', id);
};
const handleDel = (id: number) => {
    console.log('id', id);
    userStore.openDrawerUser('delete', id);
};
const handleCreate = () => {
    userStore.openDrawerUser('create');
};

const handleSizeChange = (size: number) => {
    userStore.find({ size });
};
const handleCurrentChange = (page: number) => {
    userStore.find({ page });
};
</script>

<style scoped lang="scss">
.btn-switch {
    margin-right: 12px;
}
</style>
