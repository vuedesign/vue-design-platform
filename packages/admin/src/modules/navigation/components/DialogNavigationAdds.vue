<template>
    <el-dialog
        v-model="isVisible"
        :title="title"
        :width="800"
        @close="hanldeClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="emit('closed', false)"
    >
        <!-- <template #header>
            <h4 style="display: inline-block">{{ title }}</h4>
            <el-input
                placeholder="请输入标题"
                style="width: 200px"
                clearable
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
        </template> -->
        <div class="table-filter">
            <el-input
                placeholder="请输入标题"
                clearable
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
        </div>
        <el-table
            :data="siteListRef"
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
        </el-table>
        <template #footer>
            <el-button @click="handleCancelClick">
                <el-icon>
                    <close-one />
                </el-icon>
                <span>取消</span>
            </el-button>
            <el-button
                type="primary"
                @click="handleUpdateClick"
                :loading="loading"
            >
                <el-icon>
                    <send />
                </el-icon>
                <span>提交</span>
            </el-button>
        </template>
    </el-dialog>
</template>
<script lang="ts">
export default {
    name: 'dialog-navigation-adds',
};
</script>
<script lang="ts" setup>
import { WritableComputedRef, reactive } from 'vue';
import { STATUS, statusMap } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { useNavigationStore, NavigationItem } from '../useNavigationStore';
import { useSiteStore, SiteItem } from '@/modules/site/useSiteStore';
import { typeMap } from '@/modules/site/constants';
import { Send, CloseOne, Search } from '@icon-park/vue-next';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['update:modelValue', 'closed']);
const isVisible: WritableComputedRef<boolean> = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});
const navigationStore = useNavigationStore();
const siteStore = useSiteStore();
const { isDialogAddVisible, list: navigationListRef } =
    storeToRefs(navigationStore);
const { list: siteListRef } = storeToRefs(siteStore);
const isMounted = ref(false);
const isInit = ref(true);
const isUpdate = ref(true);
const navigationMultipleTableRef = ref(null);

const filter = reactive({
    title: '',
});

onMounted(() => {
    console.warn('==d=d=d=d=d ===onMounted');
});

function defaultSelect(
    navigationList: NavigationItem[],
    siteList: SiteItem[],
    navigationMultipleTable: any,
) {
    siteList.forEach((item) => {
        const select = navigationList.find((i) => i.siteId === item.id);
        if (select) {
            multipleSelection.value.push(item);
            navigationMultipleTable.toggleRowSelection(item, undefined);
        }
    });
}

watch(isDialogAddVisible, (visible) => {
    if (
        [
            visible,
            navigationListRef.value,
            siteListRef.value,
            navigationMultipleTableRef.value,
            isUpdate.value,
        ].every((item) => !!item)
    ) {
        defaultSelect(
            navigationListRef.value,
            siteListRef.value,
            navigationMultipleTableRef.value,
        );
        isUpdate.value = false;
    }
});

const title = computed(() => {
    return '推荐导航';
});

const multipleSelection = ref<SiteItem[]>([]);
watchEffect(() => {
    if (
        [
            navigationListRef.value,
            siteListRef.value,
            isMounted.value,
            navigationMultipleTableRef.value,
            isInit.value,
        ].every((item) => !!item)
    ) {
        defaultSelect(
            navigationListRef.value,
            siteListRef.value,
            navigationMultipleTableRef.value,
        );
        isInit.value = false;
    }
});

const hanldeClose = () => {
    isUpdate.value = true;
};

onMounted(() => {
    isMounted.value = true;
});

const loading = ref(false);

const handleSelectionChange = (val: any) => {
    console.log('val', val);
    multipleSelection.value = val;
};

const handleSearch = () => {
    console.log('handleSearch');
};

const selectable = (row, index) => {
    return true;
};

const handleUpdateClick = async () => {
    // console.log('detail', detail.value);
    loading.value = true;
    // await navigationStore.create(detail.value);
    loading.value = false;
    emit('update:modelValue', false);
};

const handleCancelClick = () => {
    emit('update:modelValue', false);
};
</script>

<style scoped lang="scss">
.form-item-width {
    width: 400px;
}
.table-filter {
    padding: 8px 24px;
}
</style>
