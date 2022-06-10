import { reactive, Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash-es';
import { findData, findOneData } from './api';
import { STATUS, RULE } from './constants';
import { ElMessage, ElMessageBox } from 'element-plus';
import { NAVIGATION_STORE_KEY } from '@/configs/storeKeys';

export interface NavigationItem {
    id?: number;
    siteId: number;
    title: string;
    description: string;
    siteUrl: string;
    iconUrl: string;
    order: number;
    status: number;
    createdAt?: string;
    updatedAt?: string;
}
export type NavigationList = Array<NavigationItem>;
export interface NavigationFilter {
    page: number;
    size: number;
    order: string;
    status: number;
    search: string;
}
export interface NavigationState {
    navigationItem: NavigationItem;
    list: NavigationList;
    filter: NavigationFilter;
    total: number;
}

export interface UpdateFieldPamas {
    id: number;
    field: string;
    value: any;
    type: string;
}

export const useNavigationStore = defineStore(NAVIGATION_STORE_KEY, () => {
    const drawerType = ref('create');
    const navigationItem: NavigationItem = reactive({
        id: undefined,
        siteId: 0,
        title: '',
        description: '',
        siteUrl: '',
        iconUrl: '',
        order: 0,
        status: 1,
        createdAt: '',
        updatedAt: '',
    });
    const defaultCache = cloneDeep(navigationItem);

    const list: Ref<NavigationItem[]> = ref([]);
    const filter: NavigationFilter = reactive({
        page: 1,
        size: 20,
        order: 'updatedAt DESC',
        status: STATUS.ALL,
        rule: RULE.ALL,
        search: '',
    });
    const total = ref(0);

    const find = async (query?: Record<string, any>) => {
        Object.assign(filter, query);
        const res = await findData(filter);
        console.log('res', res);
        list.value = res.list;
        total.value = res.total;
    };
    const findOne = async (id: number) => {
        const res = await findOneData(id);
        Object.assign(navigationItem, res);
    };

    const isDialogAddVisible = ref(false);
    const isDrawerUpdateVisible = ref(false);

    const resetDetail = () => {
        Object.assign(navigationItem, defaultCache);
    };

    function setNavigationItem(newData: NavigationItem) {
        Object.assign(navigationItem, newData);
    }

    const update = (navigationItem: NavigationItem) => {
        // findOne(id);
    };

    const del = (id: number) => {
        ElMessageBox.confirm('你将永久取消该推荐，是否持续？', '取消提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                console.log(id);
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                });
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: 'Delete canceled',
                });
            });
    };

    return {
        navigationItem,
        list,
        total,
        filter,
        find,
        findOne,
        isDrawerUpdateVisible,
        isDialogAddVisible,
        resetDetail,
        del,
        update,
        setNavigationItem,
    };
});

if (import.meta.hot)
    import.meta.hot.accept(
        acceptHMRUpdate(useNavigationStore, import.meta.hot),
    );
