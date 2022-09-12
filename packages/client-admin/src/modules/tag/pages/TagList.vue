<template>
    <vd-card is-scroll>
        <template #header>
            <vd-filter>
                <template #default>
                    <el-input
                        placeholder="请输入标签名称"
                        clearable
                        style="width: 211px"
                        v-model="filter.name"
                        @keyup.enter="handleSearch"
                        @clear="handleSearch"
                    >
                        <template #prefix>
                            <el-icon>
                                <search />
                            </el-icon>
                        </template>
                    </el-input>
                    <el-button type="primary" @click="handleSearch">
                        <el-icon>
                            <icon-filter />
                        </el-icon>
                        <span>搜索</span>
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
                <el-table-column prop="name" label="名称" width="200" />
                <el-table-column prop="description" label="描述" width="auto" />
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
                <el-table-column fixed="right" label="操作" width="100">
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            text
                            @click="handleUpdate(row.id)"
                        >
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <vd-popup v-model="isDrawerUpdateVisible">
                <drawer-tag-update />
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
    name: 'tag-list',
};
</script>
<script lang="ts" setup>
import { Search, Filter as IconFilter } from '@icon-park/vue-next';
import { PAGINATION_LAYOUT } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { tableDateFormatter } from '@/utils/useTable';
import VdCard from '@/components/VdCard.vue';
import VdFilter from '@/components/VdFilter';
import VdPopup from '@/components/VdPopup';
import useTagStore from '../useTagStore';
import DrawerTagUpdate from '../components/DrawerTagUpdate.vue';

const tagStore = useTagStore();
const { filter, total, list, isDrawerUpdateVisible } = storeToRefs(tagStore);

tagStore.find(filter.value);

const handleSearch = () => {
    tagStore.find(filter.value);
};
const handleUpdate = (id: number) => {
    tagStore.openDrawerTag('update', id);
};

const handleSizeChange = (size: number) => {
    tagStore.find({ size });
};
const handleCurrentChange = (page: number) => {
    tagStore.find({ page });
};
</script>
