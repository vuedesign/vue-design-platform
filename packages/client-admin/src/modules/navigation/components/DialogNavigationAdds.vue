<template>
    <el-dialog
        v-model="isVisible"
        :title="title"
        :width="800"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="emit('closed', false)"
    >
        <div class="table-filter">
            <div class="table-filter-inner">
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
            <div class="table-filter-btn">
                <el-button @click="handleSearch">
                    <el-icon>
                        <icon-filter />
                    </el-icon>
                    <span>搜索</span>
                </el-button>
            </div>
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
import { WritableComputedRef, Ref } from 'vue';
import {
    Send,
    CloseOne,
    Search,
    Filter as IconFilter,
} from '@icon-park/vue-next';
import { STATUS, statusMap } from '@/configs/constants';
import { headerCellStyle } from '@/configs/styles';
import { useNavigationStore, NavigationItem } from '../useNavigationStore';
import { useSiteStore, SiteItem } from '@/modules/site/useSiteStore';
import { typeMap } from '@/modules/site/constants';

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
const { list: navigationListRef } = storeToRefs(navigationStore);
const { list: siteListRef } = storeToRefs(siteStore);
const isInit = ref(true);
const navigationMultipleTableRef = ref();
const multipleSelectionRef = ref<SiteItem[]>([]);

const filter = reactive({
    title: '',
    size: 999,
});

onMounted(() => {
    console.warn('==d=d=d=d=d ===onMounted');
});

function defaultSelect(
    navigationListRef: Ref<NavigationItem[]>,
    siteListRef: Ref<SiteItem[]>,
    navigationMultipleTableRef: Ref<any>,
    multipleSelectionRef: Ref<SiteItem[]>,
) {
    multipleSelectionRef.value = [];
    navigationMultipleTableRef.value.clearSelection();
    siteListRef.value.forEach((item) => {
        const select = navigationListRef.value.find(
            (i) => i.siteId === item.id,
        );
        if (select) {
            multipleSelectionRef.value.push(item);
            navigationMultipleTableRef.value.toggleRowSelection(
                item,
                undefined,
            );
        }
    });
}

const title = computed(() => {
    return '推荐导航';
});

watchEffect(() => {
    if (
        [
            navigationListRef.value,
            siteListRef.value,
            navigationMultipleTableRef.value,
            isInit.value,
        ].every((item) => !!item)
    ) {
        defaultSelect(
            navigationListRef,
            siteListRef,
            navigationMultipleTableRef,
            multipleSelectionRef,
        );
        isInit.value = false;
    }
});

const loading = ref(false);

const handleSelectionChange = (val: SiteItem[]) => {
    multipleSelectionRef.value = val;
};

const handleSearch = async () => {
    await siteStore.find(filter);
    defaultSelect(
        navigationListRef,
        siteListRef,
        navigationMultipleTableRef,
        multipleSelectionRef,
    );
};

const selectable = (row: NavigationItem) => {
    return !navigationListRef.value.some((item) => item.siteId === row.id);
};

const newMultipleSelect: Ref<NavigationItem[]> = ref([]);
const handleUpdateClick = async () => {
    newMultipleSelect.value = [];
    multipleSelectionRef.value.forEach((siteItem) => {
        if (
            !navigationListRef.value.some(
                (item) => item.siteId === siteItem.id,
            ) &&
            siteItem.id
        ) {
            newMultipleSelect.value.push({
                siteId: siteItem.id,
                title: siteItem.title,
                description: siteItem.description || '',
                siteUrl: siteItem.siteUrl,
                iconUrl: siteItem.iconUrl,
                order: 0,
                status: STATUS.DISABLE,
            });
        }
    });
    loading.value = true;
    await navigationStore.createList(newMultipleSelect.value);
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
    display: flex;
}
.table-filter-inner {
    flex: 1;
}
.table-filter-btn {
    margin-left: 12px;
}
</style>
