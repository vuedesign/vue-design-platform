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
import { USER_STORE_KEY } from '@/configs/storeKeys';
import { STATUS } from '@/configs/constants';
import { ListFilter, BaseItem } from '@/types/globals';
import { RULE } from './constants';

export interface UserItem extends BaseItem {
    username: string;
    nickname: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    rule: number | string;
}
export type UserList = Array<UserItem>;
export interface UserListFilter extends ListFilter {
    order?: string;
    search?: string;
    rule?: number | string;
}

export const useUserStore = defineStore(USER_STORE_KEY, () => {
    const drawerType = ref('create');
    const detail: UserItem = reactive({
        id: undefined,
        uuid: undefined,
        username: '',
        nickname: '',
        email: '',
        phone: '',
        password: '',
        avatar: '',
        status: STATUS.DISABLE,
        rule: RULE.USER,
    });
    const defaultCache = cloneDeep(detail);
    const list: Ref<UserItem[]> = ref([]);
    const filter: UserListFilter = reactive({
        page: 1,
        size: 20,
        order: 'updatedAt DESC',
        status: STATUS.ALL,
        rule: RULE.ALL,
        search: '',
    });
    const total = ref(0);

    const find = async (query?: UserListFilter) => {
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

    const create = async (data: UserItem) => {
        const res = await createData(data);
        await find(filter);
        return res;
    };

    const update = async (data: UserItem) => {
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

    const openDrawerUser = (type: string, id?: number) => {
        drawerType.value = type;
        if (type === 'create') {
            isDrawerUpdateVisible.value = true;
            resetDetail();
        } else if (type === 'update' && id) {
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
        openDrawerUser,
        drawerType,
    };
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
