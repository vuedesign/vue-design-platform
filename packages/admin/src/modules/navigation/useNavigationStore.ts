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
    descrition: string;
    siteUrl: string;
    iconUrl: string;
    order: number;
    status: number;
    createdAt: string;
    updatedAt: string;
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
    detail: NavigationItem;
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

export default defineStore(NAVIGATION_STORE_KEY, () => {
    const drawerType = ref('create');
    const detail: NavigationItem = reactive({
        id: undefined,
        siteId: 0,
        title: '',
        descrition: '',
        siteUrl: '',
        iconUrl: '',
        order: 0,
        status: 1,
        createdAt: '',
        updatedAt: '',
    });
    const defaultCache = cloneDeep(detail);

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
        Object.assign(detail, res);
    };

    const isDialogAddVisible = ref(false);
    const updateIDialogUpdateVisibleState = (visible: boolean) => {
        isDialogAddVisible.value = visible;
    };

    const isDrawerUpdateVisible = ref(false);
    const updateDrawerUpdateVisibleState = (visible: boolean) => {
        isDrawerUpdateVisible.value = visible;
    };

    const resetDetail = () => {
        Object.assign(detail, defaultCache);
    };

    const update = (detail: NavigationItem) => {
        // findOne(id);
    };

    const del = (id: number) => {
        ElMessageBox.confirm('你将永久删除该用户，是否持续？', '删除提示', {
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
        detail,
        list,
        total,
        filter,
        find,
        findOne,
        isDrawerUpdateVisible,
        isDialogAddVisible,
        updateDrawerUpdateVisibleState,
        resetDetail,
        del,
        update,
    };
});
