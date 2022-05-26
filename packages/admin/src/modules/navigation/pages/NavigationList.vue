<template>
    <vd-card class="page-navigation">
        <template #header>
            <div class="page-navigation-header">
                <div class="page-navigation-filter"></div>
                <div class="page-navigation-btn"></div>
            </div>
        </template>
        <template #default>
            <div class="page-navigation-container">navigation</div>
        </template>
    </vd-card>
</template>
<script lang="ts">
export default {
    name: 'navigation-index',
};
</script>
<script lang="ts" setup>
import VdCard from '../../global/components/VdCard.vue';
import useUserStore from '../useUserStore';
import { STATUS, statusMap, ruleMap } from '../constants';
import DialogUserUpdate from '../components/DialogUserUpdate.vue';

const userStore = useUserStore();
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
.page-navigation {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-navigation-header {
    display: flex;
    padding: 16px 24px;
}
.page-navigation-filter {
    flex: 1;
    .el-input,
    .el-select,
    .el-button {
        vertical-align: middle;
        margin-right: 12px;
    }
}
.page-navigation-btn {
}
.page-navigation-container {
    padding: 16px 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}

.btn-switch {
    margin-right: 12px;
}

.page-navigation-pagination {
    height: 32px;
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
}
</style>
