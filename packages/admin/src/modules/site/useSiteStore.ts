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
import { SITE_STORE_KEY } from '@/configs/storeKeys';
import { STATUS } from '@/configs/constants';
import { TYPE } from './constants';

export interface SiteItem {
    id?: number;
    uuid?: string;
    authorId: number;
    codeUrl: string;
    collections: number;
    description: string;
    down: number;
    iconUrl: string;
    logoUrl: string;
    siteUrl: string;
    tagIds: string;
    thumbUrl: string;
    title: string;
    top: number;
    type: string;
    views: number;
    status: STATUS.DISABLE;
    createdAt?: string;
    updatedAt?: string;
}
export type SiteList = Array<SiteItem>;
export interface SiteFilter {
    page: number;
    size: number;
    order: string;
    status: number;
    title: string;
}
export interface SiteState {
    detail: SiteItem;
    list: SiteList;
    filter: SiteFilter;
    total: number;
}

export interface UpdateFieldPamas {
    id: number;
    field: string;
    value: any;
    type: string;
}

export default defineStore(SITE_STORE_KEY, () => {
    const drawerType = ref('create');
    const detail: SiteItem = reactive({
        id: 0,
        authorId: 0,
        codeUrl: '',
        collections: 0,
        description: '',
        down: 0,
        iconUrl: '',
        logoUrl: '',
        siteUrl: '',
        tagIds: '',
        thumbUrl: '',
        title: '',
        top: 0,
        type: '',
        uuid: '',
        views: 0,
        status: STATUS.DISABLE,
        createdAt: undefined,
        updatedAt: undefined,
    });

    const list: Ref<SiteItem[]> = ref([]);
    const filter: SiteFilter = reactive({
        page: 1,
        size: 20,
        order: 'updatedAt DESC',
        status: STATUS.ALL,
        type: TYPE.ALL,
        title: '',
    });
    const total = ref(0);

    const find = async (query?: Record<string, any>) => {
        Object.assign(filter, query);
        const res = await findData(filter);
        console.log('res====site=====find', res);
        list.value = res.list;
        total.value = res.total;
    };
    const findOne = async (id: number) => {
        const res = await findOneData(id);
        console.log('findOne res', res);
        Object.assign(detail, res);
    };

    const create = async (data: SiteItem) => {
        const res = await createData(data);
        await find(filter);
        return res;
    };

    const update = async (data: SiteItem) => {
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

    const openDrawerSite = (type: string, id?: number) => {
        drawerType.value = type;
        if (type === 'update' && id) {
            isDrawerUpdateVisible.value = true;
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
        openDrawerSite,
        drawerType,
    };
});
