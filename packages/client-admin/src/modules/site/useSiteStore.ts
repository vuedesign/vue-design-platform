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
import { useNavigationStore } from '../navigation/useNavigationStore';
import { BaseItem, UpdateFieldParmas, ListFilter } from '@/types/globals';

export interface SiteItem extends BaseItem {
    id?: number;
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
}

export type SiteList = Array<SiteItem>;
export interface SiteListFilter extends ListFilter {
    order?: string;
    type?: string | number;
    title?: string;
}

export const useSiteStore = defineStore(SITE_STORE_KEY, () => {
    const drawerType = ref('create');
    const detail: SiteItem = reactive({
        id: undefined,
        uuid: undefined,
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
        views: 0,
        status: STATUS.DISABLE,
        createdAt: undefined,
        updatedAt: undefined,
    });
    const list: Ref<SiteItem[]> = ref([]);
    const filter: SiteListFilter = reactive({
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
    const find = async (query?: any) => {
        Object.assign(filter, query);
        const res = await findData(filter);
        list.value = res.list;
        total.value = res.total;
        return res;
    };

    /**
     * 站点详情
     * @param id 站点Id
     */
    const findOne = async (id: number) => {
        const res = await findOneData(id);
        console.log('findOne res', id, res);
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
    const updateStatus = async (data: UpdateFieldParmas) => {
        const { id, field, value, type } = data;
        updateFieldData(id, {
            type,
            field,
            value,
        }).then((res) => {
            if (res.affected === 1) {
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
    const isDrawerRecommendVisible = ref(false);

    const navigationStore = useNavigationStore();

    const openDrawerSite = async (id: number, type: string) => {
        if (type === 'update') {
            isDrawerUpdateVisible.value = true;
            findOne(id);
        } else {
            isDrawerRecommendVisible.value = true;
            const res = await findOneData(id);
            const {
                title,
                description, // description
                siteUrl,
                iconUrl,
                status,
            } = res;
            navigationStore.setNavigationItem({
                siteId: id,
                title,
                description,
                siteUrl,
                iconUrl,
                order: 0,
                status,
            });
            navigationStore.checkIsRecommend(id);
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
        updateStatus,
        destroy,
        isDrawerUpdateVisible,
        isDrawerRecommendVisible,
        openDrawerSite,
        drawerType,
    };
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useSiteStore, import.meta.hot));
