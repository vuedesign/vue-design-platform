import { cloneDeep } from 'lodash-es';
import {
    findData,
    findOneData,
    // updateFieldData,
    createData,
    updateData,
    destroyData,
} from './api';
import { Ref } from 'vue';
import { CONFIG_STORE_KEY } from '@/configs/storeKeys';
import { STATUS } from '@/configs/constants';
import { ListFilter, BaseItem } from '@/types/globals';

export interface ConfigItem extends BaseItem {
    key: string;
    value: string;
    group?: string;
    link?: string;
    remark?: string;
    content?: string;
}
export type ConfigList = Array<ConfigItem>;

export interface ConfigListFilter extends ListFilter {
    order?: string;
    search?: string;
}

export default defineStore(CONFIG_STORE_KEY, () => {
    const drawerType = ref('create');
    const detail: ConfigItem = reactive({
        id: undefined,
        key: '',
        value: '',
        group: '',
        link: '',
        remark: '',
        content: '',
        status: STATUS.AVAILABLE,
    });
    const defaultCache = cloneDeep(detail);
    const list: Ref<ConfigItem[]> = ref([]);
    const filter: ConfigListFilter = reactive({
        page: 1,
        size: 20,
        status: STATUS.ALL,
        search: '',
    });
    const total = ref(0);

    const find = async (query?: ConfigListFilter) => {
        console.log('filter', filter);
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

    const create = async (data: ConfigItem) => {
        const res = await createData(data);
        await find(filter);
        return res;
    };

    const update = async (data: ConfigItem) => {
        const res = await updateData(data);
        await find(filter);
        return !!res.affected;
    };

    const destroy = (id: number) => {
        return destroyData(id).then((res) => {
            find(filter);
            return res;
        });
    };

    const isDrawerUpdateVisible = ref(false);
    const isDrawerContentUpdateVisible = ref(false);

    const resetDetail = () => {
        Object.assign(detail, defaultCache);
    };

    const del = (id: number) => {
        ElMessageBox.confirm('你将永久删除该用户，是否持续？', '删除提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                destroy(id).then(() => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    });
                });
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消删除',
                });
            });
    };

    const openDrawerConfig = (type: string, id?: number) => {
        drawerType.value = type;
        if (type === 'create') {
            isDrawerUpdateVisible.value = true;
            resetDetail();
        } else if (type === 'update' && id) {
            isDrawerUpdateVisible.value = true;
            findOne(id);
        } else if (type === 'contentUpdate' && id) {
            isDrawerContentUpdateVisible.value = true;
            findOne(id);
        } else if (type === 'delete' && id) {
            del(id);
        }
    };

    return {
        detail,
        list,
        total,
        filter,
        find,
        findOne,
        create,
        update,
        destroy,
        isDrawerUpdateVisible,
        isDrawerContentUpdateVisible,
        openDrawerConfig,
        drawerType,
    };
});
