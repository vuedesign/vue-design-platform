<template>
    <vd-card class="page-count">
        <!-- <template #header>
            <div class="page-count-header">
                <div class="page-count-filter"></div>
                <div class="page-user-btn"></div>
            </div>
        </template> -->
        <template #default="{ height }">
            <el-table
                :data="list"
                stripe
                style="width: 100%"
                :key="height"
                :height="height"
                :header-cell-style="headerCellStyle"
            >
                <el-table-column prop="id" label="ID" width="48" />
                <el-table-column prop="authorId" label="用户ID" width="96" />
                <el-table-column prop="sites" label="站点数" width="auto" />
                <el-table-column prop="views" label="浏览量" width="auto" />
                <el-table-column
                    prop="collections"
                    label="收藏量"
                    width="auto"
                />
                <el-table-column prop="top" label="点赞量" width="auto" />
                <el-table-column prop="down" label="点踩量" width="auto" />
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
                <el-table-column fixed="right" label="操作" width="90">
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            text
                            @click="handleDel(row.id)"
                        >
                            更多
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    name: 'count-index',
};
</script>
<script lang="ts" setup>
import VdCard from '@/components/VdCard.vue';
import useCountStore from '../useCountStore';
import { tableDateFormatter } from '@/utils/useTable';
import { PAGINATION_LAYOUT } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
// import { STATUS, statusMap, ruleMap } from '../constants';

const countStore = useCountStore();
const { filter, total, list } = storeToRefs(countStore);

countStore.find();

const handleDel = (id: number) => {
    console.log('id', id);
};

const handleSizeChange = (size: number) => {
    countStore.find({ size });
};
const handleCurrentChange = (page: number) => {
    countStore.find({ page });
};
</script>

<style scoped lang="scss">
.page-count {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-count-header {
    display: flex;
    padding: 16px 24px;
}
.page-count-filter {
    flex: 1;
    .el-input,
    .el-select,
    .el-button {
        vertical-align: middle;
        margin-right: 12px;
    }
}
.page-count-btn {
}
.page-count-container {
    padding: 16px 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}

.page-count-pagination {
    height: 32px;
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
}
</style>
