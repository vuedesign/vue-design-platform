<template>
    <vd-card class="page-navigation">
        <template #header>
            <vd-filter>
                <template #default="{ input, select, button }">
                    <el-input
                        placeholder="请输入站点名称"
                        clearable
                        :style="input"
                        v-model="filter.title"
                        @keyup.enter="handleSearch"
                        @clear="handleSearch"
                    >
                        <template #prefix>
                            <iconpark-icon name="search"></iconpark-icon>
                        </template>
                    </el-input>
                    <el-input
                        placeholder="请输入站点ID"
                        clearable
                        :style="input"
                        v-model="filter.siteId"
                        @keyup.enter="handleSearch"
                        @clear="handleSearch"
                    >
                        <template #prefix>
                            <iconpark-icon
                                name="adobe-indesign"
                            ></iconpark-icon>
                        </template>
                    </el-input>
                    <el-select
                        clearable
                        :style="select"
                        v-model="filter.status"
                        @change="handleSearch"
                    >
                        <template #prefix>
                            <iconpark-icon name="broadcast"></iconpark-icon>
                        </template>
                        <el-option
                            v-for="[key, value] in statusMap"
                            :key="key"
                            :label="value"
                            :value="key"
                        />
                    </el-select>
                    <el-button
                        type="primary"
                        :style="button"
                        @click="handleSearch"
                    >
                        <el-icon>
                            <iconpark-icon name="filter"></iconpark-icon>
                        </el-icon>
                        <span>搜索</span>
                    </el-button>
                </template>
                <template #right="{ button }">
                    <el-button
                        type="success"
                        :style="button"
                        @click="handleCreate"
                    >
                        <el-icon>
                            <iconpark-icon name="add-user"></iconpark-icon>
                        </el-icon>
                        <span>新增</span>
                    </el-button>
                </template>
            </vd-filter>
        </template>
        <template #default="{ height }">
            <div class="page-navigation-container">
                <el-table
                    :data="list"
                    stripe
                    style="width: 100%"
                    :key="height"
                    :height="height"
                    :header-cell-style="headerCellStyle"
                >
                    <el-table-column prop="siteId" label="站点ID" width="80" />
                    <el-table-column label="Icon" width="64">
                        <template #default="scope">
                            <el-avatar
                                shape="square"
                                :size="40"
                                :src="scope.row.iconUrl"
                                style="display: block"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="order" label="排序" width="64" />
                    <el-table-column
                        prop="title"
                        label="站点名称"
                        width="120"
                    />
                    <el-table-column
                        prop="description"
                        label="站点描述"
                        width="300"
                    />
                    <el-table-column label="状态" width="80">
                        <template #default="scope">
                            <el-tag
                                v-if="scope.row.status === STATUS.AVAILABLE"
                            >
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
                                    @change="
                                        (status) => handleStatus(status, row.id)
                                    "
                                />
                            </span>
                            <el-button
                                type="primary"
                                text
                                @click="handleEidt(row.id)"
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
            <drawer-navigation-update />
            <dialog-navigation-add />
        </template>
    </vd-card>
</template>
<script lang="ts">
export default {
    name: 'navigation-list',
};
</script>
<script lang="ts" setup>
import { STATUS, statusMap } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { tableDateFormatter } from '@/utils/useTable';
import VdCard from '@/components/VdCard.vue';
import { useNavigationStore } from '../useNavigationStore';
import { useSiteStore } from '../../site/useSiteStore';
import DrawerNavigationUpdate from '../components/DrawerNavigationUpdate.vue';
import DialogNavigationAdd from '../components/DialogNavigationAdd.vue';

const navigationStore = useNavigationStore();
const { filter, list, isDrawerUpdateVisible, isDialogAddVisible } =
    storeToRefs(navigationStore);
const siteStore = useSiteStore();
navigationStore.find();

const handleSearch = () => {
    navigationStore.find(filter.value);
};

const handleEidt = (id: number) => {
    navigationStore.findOne(id);
    isDrawerUpdateVisible.value = true;
};
const handleStatus = (status: number, id: number) => {
    navigationStore.updateStatus({
        id,
        type: 'number',
        field: 'status',
        value: status,
    });
};
const handleDel = (id: number) => {
    console.log('id', id);
    navigationStore.del(id);
};
const handleCreate = () => {
    siteStore.find({ size: 999 }).then((res) => {
        isDialogAddVisible.value = true;
    });
};
</script>

<style scoped lang="scss">
.page-navigation {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-navigation-header {
    display: flex;
    padding: 16px 24px;
}
.page-navigation-filter {
    flex: 1;
    .el-input,
    .el-select,
    .el-button {
        vertical-align: middle;
        margin-right: 12px;
    }
}
.page-navigation-btn {
}
.page-navigation-container {
    // padding: 16px 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}

.btn-switch {
    margin-right: 12px;
}

.page-navigation-pagination {
    height: 32px;
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
}
</style>
