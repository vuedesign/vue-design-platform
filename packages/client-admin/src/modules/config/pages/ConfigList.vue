<template>
    <vd-card is-scroll>
        <template #header>
            <vd-filter>
                <template #default>
                    <el-input
                        placeholder="请输入用键或值"
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
                            <plus />
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
                <el-table-column prop="key" label="配置键" width="100" />
                <el-table-column prop="value" label="配置值" width="200" />
                <el-table-column prop="group" label="分组" width="160" />
                <el-table-column prop="order" label="排序" width="60" />
                <el-table-column prop="link" label="链接" width="200" />
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
                <el-table-column prop="remark" label="备注" width="auto" />
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
                <el-table-column fixed="right" label="操作" width="280">
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
                            :type="row.content ? 'primary' : ''"
                            text
                            @click="handleContentUpdate(row.id)"
                        >
                            内容
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
                <drawer-config-update />
            </vd-popup>
            <vd-popup v-model="isDrawerContentUpdateVisible">
                <drawer-config-content-update />
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
    name: 'config-list',
};
</script>
<script lang="ts" setup>
import {
    Search,
    Broadcast,
    Filter as IconFilter,
    Plus,
} from '@icon-park/vue-next';
import { STATUS, statusMap, PAGINATION_LAYOUT } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { tableDateFormatter } from '@/utils/useTable';
import VdCard from '@/components/VdCard.vue';
import VdFilter from '@/components/VdFilter';
import VdPopup from '@/components/VdPopup';
import useConfigStore from '../useConfigStore';
import DrawerConfigUpdate from '../components/DrawerConfigUpdate.vue';
import DrawerConfigContentUpdate from '../components/DrawerConfigContentUpdate.vue';

const configStore = useConfigStore();
const {
    filter,
    total,
    list,
    isDrawerUpdateVisible,
    isDrawerContentUpdateVisible,
} = storeToRefs(configStore);

configStore.find(filter.value);

const handleSearch = () => {
    configStore.find(filter.value);
};
const handleUpdate = (id: number) => {
    configStore.openDrawerConfig('update', id);
};
const handleContentUpdate = (id: number) => {
    configStore.openDrawerConfig('contentUpdate', id);
};
const handleDel = (id: number) => {
    configStore.openDrawerConfig('delete', id);
};
const handleCreate = () => {
    configStore.openDrawerConfig('create');
};

const handleSizeChange = (size: number) => {
    configStore.find({ size });
};
const handleCurrentChange = (page: number) => {
    configStore.find({ page });
};
</script>

<style scoped lang="scss">
.btn-switch {
    margin-right: 12px;
}
</style>
