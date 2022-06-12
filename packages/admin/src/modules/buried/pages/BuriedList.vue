<template>
    <vd-card class="page-buried">
        <template #header>
            <div class="page-buried-header">
                <div class="page-buried-filter"></div>
                <div class="page-user-btn"></div>
            </div>
        </template>
        <template #default>
            <div class="page-user-container">buried</div>
        </template>
    </vd-card>
</template>
<script lang="ts">
export default {
    name: 'buried-index',
};
</script>
<script lang="ts" setup>
import VdCard from '@/components/VdCard.vue';
import useBuriedStore from '../useBuriedStore';
import { STATUS, statusMap, ruleMap } from '../constants';
import DialogBuriedUpdate from '../components/DialogBuriedUpdate.vue';

const userStore = useBuriedStore();
const { filter, total, list, isDialogUpdateVisible } = storeToRefs(userStore);

userStore.find();

const handleSearch = (id: number) => {
    userStore.find(filter.value);
};
const handleUpdate = (id: number) => {
    userStore.findOne(id);
    isDialogUpdateVisible.value = true;
};
const handleDel = (id: number) => {
    console.log('id', id);
    userStore.del(id);
};
const handleCreate = () => {
    userStore.resetDetail();
    isDialogUpdateVisible.value = true;
};
</script>

<style scoped lang="scss">
.page-buried {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-buried-header {
    display: flex;
    padding: 16px 24px;
}
.page-buried-filter {
    flex: 1;
    .el-input,
    .el-select,
    .el-button {
        vertical-align: middle;
        margin-right: 12px;
    }
}
.page-buried-btn {
}
.page-buried-container {
    padding: 16px 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}

.btn-switch {
    margin-right: 12px;
}

.page-buried-pagination {
    height: 32px;
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
}
</style>
