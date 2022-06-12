<template>
    <vd-card class="page-material">
        <template #header>
            <div class="page-material-header">
                <div class="page-material-filter"></div>
                <div class="page-material-btn"></div>
            </div>
        </template>
        <template #default>
            <div class="page-material-container">material</div>
        </template>
    </vd-card>
</template>
<script lang="ts">
export default {
    name: 'material-list',
};
</script>
<script lang="ts" setup>
import VdCard from '@/components/VdCard.vue';
import useMaterialStore from '../useMaterialStore';
import { STATUS, statusMap, ruleMap } from '../constants';
import DialogUserUpdate from '../components/DialogUserUpdate.vue';

const materiaStore = useMaterialStore();
const { filter, total, list, isDialogUpdateVisible } =
    storeToRefs(materiaStore);

materiaStore.find();

const handleSearch = (id: number) => {
    materiaStore.find(filter.value);
};
const handleUpdate = (id: number) => {
    materiaStore.findOne(id);
    isDialogUpdateVisible.value = true;
};
const handleDel = (id: number) => {
    console.log('id', id);
    materiaStore.del(id);
};
const handleCreate = () => {
    materiaStore.resetDetail();
    isDialogUpdateVisible.value = true;
};
</script>

<style scoped lang="scss">
.page-material {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-material-header {
    display: flex;
    padding: 16px 24px;
}
.page-material-filter {
    flex: 1;
    .el-input,
    .el-select,
    .el-button {
        vertical-align: middle;
        margin-right: 12px;
    }
}
.page-material-btn {
}
.page-material-container {
    padding: 16px 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}

.btn-switch {
    margin-right: 12px;
}

.page-material-pagination {
    height: 32px;
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
}
</style>
