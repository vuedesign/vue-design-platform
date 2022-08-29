<template>
    <vd-card is-scroll>
        <template #header>
            <vd-filter>
                <template #default>
                    <el-select
                        clearable
                        v-model="filter.type"
                        @change="handleSearch"
                    >
                        <template #prefix>
                            <el-icon>
                                <user-business />
                            </el-icon>
                        </template>
                        <el-option
                            v-for="[key, value] in typeMap"
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
                <el-table-column label="封面" width="100">
                    <template #default="{ row }">
                        <el-avatar
                            shape="square"
                            :size="40"
                            :src="row.path"
                            style="display: block"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="原名"
                    prop="originalname"
                    show-overflow-tooltip
                    width="200"
                />
                <el-table-column
                    label="名称"
                    prop="filename"
                    show-overflow-tooltip
                    width="200"
                />
                <el-table-column
                    label="描述"
                    prop="description"
                    show-overflow-tooltip
                    width="200"
                />
                <el-table-column
                    label="路径"
                    prop="path"
                    show-overflow-tooltip
                    width="200"
                />
                <el-table-column label="大小" prop="size" width="100" />
                <el-table-column label="MimeType" prop="mimetype" width="100" />
                <el-table-column label="作者id" prop="authorId" width="100" />
                <el-table-column label="状态" width="100">
                    <template #default="{ row }">
                        <el-tag v-if="row.status === STATUS.AVAILABLE">
                            {{ statusMap.get(row.status || STATUS.AVAILABLE) }}
                        </el-tag>
                        <el-tag v-else type="info">
                            {{ statusMap.get(row.status || STATUS.DISABLE) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="类型" width="160">
                    <template #default="{ row }">
                        {{ typeMap.get(row.type) }}
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

                <el-table-column
                    fixed="right"
                    label="审核"
                    align="center"
                    width="64"
                >
                    <template #default="{ row }">
                        <el-switch
                            v-model="row.status"
                            :active-value="STATUS.AVAILABLE"
                            :inactive-value="STATUS.DISABLE"
                            @change="(status) => handleStatus(status, row.id)"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="84"
                    align="center"
                >
                    <template #default="{ row }">
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
            <!-- <vd-popup v-model="isDrawerUpdateVisible">
                <drawer-site-update />
            </vd-popup>
            <vd-popup v-model="isDrawerRecommendVisible">
                <drawer-site-recommend />
            </vd-popup> -->
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
    name: 'file-list',
};
</script>
<script lang="ts" setup>
import {
    UserBusiness,
    Broadcast,
    Filter as IconFilter,
} from '@icon-park/vue-next';
import { STATUS, statusMap, PAGINATION_LAYOUT } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { tableDateFormatter } from '@/utils/useTable';
import VdCard from '@/components/VdCard.vue';
import VdFilter from '@/components/VdFilter';
import { typeMap } from '../constants';
import useFileStore from '../useFileStore';

const fileStore = useFileStore();
const { filter, total, list } = storeToRefs(fileStore);

fileStore.find();

const handleSearch = (id: number) => {
    fileStore.find(filter.value);
};
// const handleUpdate = (id: number) => {
//     fileStore.findOne(id);
//     isDialogUpdateVisible.value = true;
// };
const handleDel = (id: number) => {
    fileStore.destroy(id);
};
// const handleCreate = () => {
//     fileStore.resetDetail();
//     isDialogUpdateVisible.value = true;
// };
const handleStatus = (status: number, id: number) => {
    fileStore.updateStatus({
        id,
        type: 'number',
        field: 'status',
        value: status,
    });
};
const handleSizeChange = (size: number) => {
    fileStore.find({ size });
};
const handleCurrentChange = (page: number) => {
    fileStore.find({ page });
};
</script>

<style scoped lang="scss">
.btn-switch {
    margin-right: 12px;
}
</style>
