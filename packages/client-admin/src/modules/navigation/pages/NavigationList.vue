<template>
    <vd-card is-scroll class="page-navigation">
        <template #header>
            <vd-filter>
                <el-input
                    placeholder="请输入站点名称"
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
                <el-input
                    placeholder="请输入站点ID"
                    clearable
                    v-model="filter.siteId"
                    @keyup.enter="handleSearch"
                    @clear="handleSearch"
                >
                    <template #prefix>
                        <el-icon>
                            <adobe-indesign />
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
                <el-table-column prop="title" label="站点名称" width="120" />
                <el-table-column
                    prop="description"
                    label="站点描述"
                    width="300"
                />
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
            <!-- 编辑推荐站点信息  -->
            <vd-popup v-model="isDrawerUpdateVisible">
                <drawer-navigation-update />
            </vd-popup>
            <!-- 新增推荐站点 -->
            <vd-popup v-model="isDialogAddVisible">
                <dialog-navigation-adds />
            </vd-popup>
        </template>
        <template v-if="filter.size && total > filter.size" #pagination>
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
    name: 'navigation-list',
};
</script>
<script lang="ts" setup>
import {
    Search,
    Broadcast,
    Filter as IconFilter,
    AddUser,
    AdobeIndesign,
} from '@icon-park/vue-next';
import { STATUS, statusMap, PAGINATION_LAYOUT } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { tableDateFormatter } from '@/utils/useTable';
import VdCard from '@/components/VdCard.vue';
import VdFilter from '@/components/VdFilter';
import { useNavigationStore } from '../useNavigationStore';
import { useSiteStore } from '../../site/useSiteStore';
import VdPopup from '@/components/VdPopup';
import DrawerNavigationUpdate from '../components/DrawerNavigationUpdate.vue';
import DialogNavigationAdds from '../components/DialogNavigationAdds.vue';

const navigationStore = useNavigationStore();
const { filter, list, total, isDrawerUpdateVisible, isDialogAddVisible } =
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
    siteStore.find({ size: 999, status: STATUS.AVAILABLE }).then((res) => {
        isDialogAddVisible.value = true;
    });
};

const handleSizeChange = (size: number) => {
    navigationStore.find({ size });
};
const handleCurrentChange = (page: number) => {
    navigationStore.find({ page });
};
</script>

<style scoped lang="scss">
.btn-switch {
    margin-right: 12px;
}
</style>
