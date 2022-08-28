<template>
    <vd-card is-scroll>
        <template #header>
            <vd-filter>
                <template #default>
                    <el-input
                        placeholder="请输入标题"
                        clearable
                        style="width: 211px"
                        v-model="filter.title"
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
                <el-table-column prop="collections" label="收藏量" width="70" />
                <el-table-column prop="top" label="顶" width="70" />
                <el-table-column prop="down" label="踩" width="70" />
                <el-table-column label="状态" width="70">
                    <template #default="{ row }">
                        <el-tag v-if="row.status === STATUS.AVAILABLE">
                            {{ statusMap.get(row.status || STATUS.AVAILABLE) }}
                        </el-tag>
                        <el-tag v-else type="info">
                            {{ statusMap.get(row.status || STATUS.DISABLE) }}
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
                            @click="handleUpdate(row.id)"
                        >
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="更多"
                    width="64"
                    align="center"
                >
                    <template #default="{ row }">
                        <el-dropdown
                            trigger="click"
                            @command="
                                (command) => handleMoreCommand(command, row.id)
                            "
                        >
                            <el-icon :size="16">
                                <more-one />
                            </el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="recommend">
                                        <el-space>
                                            <el-icon><trophy /></el-icon>
                                            <span>推荐</span>
                                        </el-space>
                                    </el-dropdown-item>
                                    <el-dropdown-item command="delete">
                                        <el-space>
                                            <el-icon><delete /></el-icon>
                                            <span>删除</span>
                                        </el-space>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <vd-popup v-model="isDrawerUpdateVisible">
                <drawer-site-update />
            </vd-popup>
            <vd-popup v-model="isDrawerRecommendVisible">
                <drawer-site-recommend />
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
    name: 'site-list',
};
</script>
<script lang="ts" setup>
import {
    Search,
    UserBusiness,
    Broadcast,
    Filter as IconFilter,
    Trophy,
    Delete,
    MoreOne,
} from '@icon-park/vue-next';
import { STATUS, statusMap, PAGINATION_LAYOUT } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { tableDateFormatter } from '@/utils/useTable';
import VdCard from '@/components/VdCard.vue';
import VdFilter from '@/components/VdFilter';
import VdPopup from '@/components/VdPopup';
import { useSiteStore } from '../useSiteStore';
import { typeMap } from '../constants';
import DrawerSiteUpdate from '../components/DrawerSiteUpdate.vue';
import DrawerSiteRecommend from '../components/DrawerSiteRecommend.vue';

const siteStore = useSiteStore();
const { filter, total, list, isDrawerRecommendVisible, isDrawerUpdateVisible } =
    storeToRefs(siteStore);

siteStore.find(filter.value);

const handleSearch = () => {
    siteStore.find(filter.value);
};
const handleStatus = (status: number, id: number) => {
    siteStore.updateStatus({
        id,
        type: 'number',
        field: 'status',
        value: status,
    });
};
const handleUpdate = (id: number) => {
    siteStore.openDrawerSite(id, 'update');
};

const handleMoreCommand = (command: string, id: number) => {
    switch (command) {
        case 'delete':
            siteStore.destroy(id);
            break;
        case 'recommend':
            siteStore.openDrawerSite(id, 'recommend');
            break;
    }
    // console.log('command', command);
};

const handleSizeChange = (size: number) => {
    siteStore.find({ size });
};
const handleCurrentChange = (page: number) => {
    siteStore.find({ page });
};
</script>
<style lang="scss" scoped>
.btn-recommend-text,
.btn-delete-text {
    display: inline-block;
    margin-left: 8px;
}
</style>
