import {
    findData,
    findOneData,
    updateFieldData,
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
export const useSiteStore = defineStore(SITE_STORE_KEY, () => {
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

    /**
     * 站点列表
     * @param query
     */
    const find = async (query?: Record<string, any>) => {
        Object.assign(filter, query);
        const res = await findData(filter);
        list.value = res.list;
        total.value = res.total;
    };

    /**
     * 站点详情
     * @param id 站点Id
     */
    const findOne = async (id: number) => {
        const res = await findOneData(id);
        console.log('findOne res', res);
        Object.assign(detail, res);
    };

    /**
     * 创建站点
     * @param data
     * @returns
     */
    const create = async (data: SiteItem) => {
        const res = await createData(data);
        await find(filter);
        return res;
    };

    /**
     * 编辑站点
     * @param data
     * @returns
     */
    const update = async (data: SiteItem) => {
        const res = await updateData(data);
        await find(filter);
        return !!res.affected;
    };

    /**
     * 删除站点
     * @param id
     * @returns
     */
    const destroy = (id: number) => {
        ElMessageBox.confirm('你将永久删除该站点，是否持续？', '删除提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                destroyData(id)
                    .then((res) => {
                        find(filter);
                        return res;
                    })
                    .then(() => {
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

    /**
     * 更改站点状态
     * @param data
     */
    const updateStatus = async (data: UpdateFieldPamas) => {
        const { id, field, value, type } = data;
        updateFieldData(id, {
            type,
            field,
            value,
        }).then((res) => {
            if (res.affected === 1) {
                console.log(value, '=====');
                ElMessage({
                    type: value === STATUS.AVAILABLE ? 'success' : 'warning',
                    message:
                        value === STATUS.AVAILABLE
                            ? '成功通过审核'
                            : '下线成功',
                });
            }
        });
    };

    const isDrawerUpdateVisible = ref(false);

    const openDrawerSite = (id: number) => {
        isDrawerUpdateVisible.value = true;
        findOne(id);
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
        updateStatus,
        destroy,
        isDrawerUpdateVisible,
        openDrawerSite,
        drawerType,
    };
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useSiteStore, import.meta.hot));
