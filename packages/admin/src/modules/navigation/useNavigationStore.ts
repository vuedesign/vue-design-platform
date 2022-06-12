import { reactive, Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash-es';
import {
    findData,
    findOneData,
    destroyData,
    updateData,
    createData,
    findOneBySiteIdData,
} from './api';
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
    page?: number;
    size?: number;
    order?: string;
    status?: number | string;
    title?: string;
    siteId?: number | string;
}

export interface UpdateFieldPamas {
    id: number;
    field: string;
    value: any;
    type: string;
}

export const useNavigationStore = defineStore(NAVIGATION_STORE_KEY, () => {
    const detail: NavigationItem = reactive({
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
    const defaultCache = cloneDeep(detail);

    const list: Ref<NavigationItem[]> = ref([]);
    const filter: NavigationFilter = reactive({
        page: 1,
        size: 20,
        status: STATUS.ALL,
        rule: RULE.ALL,
        title: '',
        siteId: '',
    });
    const total = ref(0);
    const isRecommend = ref(false);

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

    const checkIsRecommend = async (id: number) => {
        isRecommend.value = await findOneBySiteIdData(id);
    };

    const isDialogAddVisible = ref(false);
    const isDrawerUpdateVisible = ref(false);

    const resetDetail = () => {
        Object.assign(detail, defaultCache);
    };

    function setNavigationItem(newData: NavigationItem) {
        Object.assign(detail, newData);
    }

    const create = async (detail: NavigationItem) => {
        const res = await createData(detail);
        await find(filter);
        return res;
    };

    const update = async (detail: NavigationItem) => {
        const res = await updateData(detail);
        await find(filter);
        return !!res.affected;
    };

    const del = (id: number) => {
        ElMessageBox.confirm('你将永久取消该推荐，是否持续？', '取消提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                console.log(id);
                destroyData(id).then(({ affected }) => {
                    ElMessage({
                        type: affected === 1 ? 'success' : 'error',
                        message: affected === 1 ? '删除成功' : '删除失败',
                    });
                    find(filter);
                });
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消删除',
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
        resetDetail,
        del,
        create,
        update,
        setNavigationItem,
        isRecommend,
        checkIsRecommend,
    };
});

if (import.meta.hot)
    import.meta.hot.accept(
        acceptHMRUpdate(useNavigationStore, import.meta.hot),
    );
