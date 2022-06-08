<template>
    <el-dialog v-model="isDialogAddVisible" :title="title" :width="800">
        <el-table
            :data="siteList"
            stripe
            style="width: 100%"
            :height="400"
            :header-cell-style="headerCellStyle"
            ref="navigationMultipleTableRef"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                type="selection"
                width="48"
                :selectable="selectable"
            />
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
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="vd-btn" @click="handleCancelClick">
                    <el-icon>
                        <iconpark-icon name="close-one"></iconpark-icon>
                    </el-icon>
                    <span>取消</span>
                </el-button>
                <el-button
                    class="vd-btn"
                    type="primary"
                    @click="handleUpdateClick"
                    :loading="loading"
                >
                    <el-icon>
                        <iconpark-icon name="send"></iconpark-icon>
                    </el-icon>
                    <span>提交</span>
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
export default {
    name: 'dialog-navigation-add',
};
</script>
<script lang="ts" setup>
import { Ref } from 'vue';
import { STATUS, statusMap } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { tableDateFormatter } from '@/utils/useTable';
import { useNavigationStore } from '../useNavigationStore';
import { useSiteStore, SiteItem } from '../../site/useSiteStore';
import { typeMap } from '../../site/constants';
import { ruleMap } from '../constants';

const navigationStore = useNavigationStore();
const siteStore = useSiteStore();
const { isDialogAddVisible, list } = storeToRefs(navigationStore);
const { list: siteList } = storeToRefs(siteStore);

siteStore.find({ size: 999 });

const title = computed(() => {
    return '推荐导航';
});

const row: Ref<SiteItem[]> = ref([]);
watch([list, siteList], ([navList, siteList]) => {
    if (navList.length > 0 && siteList.length > 0) {
        navList.forEach((item) => {
            console.log('item', item);
            const select = siteList.find((i) => i.id === item.siteId);
            if (select) {
                console.log('select', select);
                row.value.push(select);
            }
        });
    }
    console.log('===', row);
});

console.log('row', row.value);
const navigationMultipleTableRef = ref(null);
onMounted(() => {
    navigationMultipleTableRef.value &&
        navigationMultipleTableRef.value.toggleRowSelection(
            row.value,
            undefined,
        );
});

const loading = ref(false);

const handleSelectionChange = (val: any) => {
    console.log('val', val);
    console.log(
        'navigationMultipleTableRef',
        navigationMultipleTableRef.value,
        navigationMultipleTableRef.value.getSelectionRows(),
    );
};

const selectable = (row, index) => {
    // console.log('row, index', row, index);
    return true;
};

const handleUpdateClick = async () => {
    // console.log('detail', detail.value);
    loading.value = true;
    // await navigationStore.create(detail.value);
    loading.value = false;
    // navigationStore.$patch({
    //     isDialogUpdateVisible: false,
    // });
};

const handleCancelClick = () => {
    // navigationStore.$patch({
    //     isDialogUpdateVisible: false,
    // });
};
</script>

<style scoped lang="scss">
.form-item-width {
    width: 400px;
}
.vd-btn {
    min-width: 80px;
}
</style>
