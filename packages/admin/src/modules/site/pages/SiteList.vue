<template>
    <vd-card class="page-site">
        <template #header>
            <div class="page-site-header">
                <div class="page-site-filter">
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
                    <el-select
                        v-model="filter.type"
                        placeholder="Select"
                        style="width: 200px"
                    >
                        <template #prefix>
                            <el-icon>
                                <iconpark-icon
                                    name="user-business"
                                ></iconpark-icon>
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
                        v-model="filter.status"
                        placeholder="Select"
                        style="width: 200px"
                    >
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
                <div class="page-site-btn-group"></div>
            </div>
        </template>
        <template #default>
            <div class="page-site-container" ref="pageContainerRef">
                <el-table
                    :data="list"
                    stripe
                    style="width: 100%"
                    :key="tabelMaxheight"
                    :height="tabelMaxheight"
                    :header-cell-style="headerCellStyle"
                >
                    <el-table-column prop="id" label="ID" width="48" />
                    <el-table-column label="封面" width="100">
                        <template #default="{ row }">
                            <el-image
                                :src="row.thumbUrl"
                                :style="{
                                    'width': '80px',
                                    'height': '40px',
                                    'display': 'block',
                                    'border-radius': '4px',
                                }"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="Icon" width="64">
                        <template #default="{ row }">
                            <el-avatar
                                shape="square"
                                :size="40"
                                :src="row.iconUrl"
                                style="display: block"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="标题" width="300">
                        <template #default="{ row }">
                            <a :href="row.siteUrl" target="_blank">
                                {{ row.title }}
                            </a>
                        </template>
                    </el-table-column>

                    <el-table-column prop="views" label="浏览量" width="70" />
                    <el-table-column
                        prop="collections"
                        label="收藏量"
                        width="70"
                    />
                    <el-table-column prop="top" label="顶" width="70" />
                    <el-table-column prop="down" label="踩" width="70" />
                    <el-table-column label="状态" width="70">
                        <template #default="{ row }">
                            <el-tag v-if="row.status === STATUS.AVAILABLE">
                                {{
                                    statusMap.get(
                                        row.status || STATUS.AVAILABLE,
                                    )
                                }}
                            </el-tag>
                            <el-tag v-else type="info">
                                {{
                                    statusMap.get(row.status || STATUS.DISABLE)
                                }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" width="70">
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
            </div>
            <drawer-site-update />
        </template>
        <template #footer>
            <div class="page-site-pagination">
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
    name: 'site-list',
};
</script>
<script lang="ts" setup>
import { STATUS, statusMap } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { useTableMaxHeight, tableDateFormatter } from '@/utils/useTable';
import VdCard from '../../global/components/VdCard.vue';
import useSiteStore from '../useSiteStore';
import { typeMap } from '../constants';
import DrawerSiteUpdate from '../components/DrawerSiteUpdate.vue';

const siteStore = useSiteStore();
const pageContainerRef = ref(document.createElement('div'));
const tabelMaxheight = useTableMaxHeight(pageContainerRef);
const { filter, total, list } = storeToRefs(siteStore);

siteStore.find(filter.value);

const handleSearch = () => {
    siteStore.find(filter.value);
};
const handleUpdate = (id: number) => {
    siteStore.openDrawerSite('update', id);
};
const handleDel = (id: number) => {
    console.log('id', id);
    siteStore.openDrawerSite('delete', id);
};
</script>

<style scoped lang="scss">
.page-site-header {
    display: flex;
    padding: 16px 24px;
}
.page-site-filter {
    flex: 1;
    .el-input,
    .el-select,
    .el-button {
        vertical-align: middle;
        margin-right: 8px;
        margin-bottom: 12px;
    }
    margin-bottom: -12px;
}

.page-site-btn-group {
    width: auto;
}
.vd-btn {
    width: 80px;
}
.page-site-container {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: -1px;
}

.btn-switch {
    margin-right: 12px;
}

.page-site-pagination {
    height: 32px;
    display: flex;
    justify-content: flex-end;
    padding: 8px 24px;
}
</style>
