import { reactive, Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash-es';
import {
    findData,
    findOneData,
    // updateFieldData,
    createData,
    updateData,
    destroyData,
} from './api';
import { STATUS, RULE } from './constants';
// import { ElMessage, ElMessageBox } from 'element-plus';

export interface UserItem {
    id?: number;
    uuid: string;
    username: string;
    nickname: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    isShow: number;
    rule: number;
    createdAt: string;
    updatedAt: string;
}
export type UserList = Array<UserItem>;
export interface UserFilter {
    page: number;
    size: number;
    order: string;
    status: number;
    search: string;
}
export interface UserState {
    detail: UserItem;
    list: UserList;
    filter: UserFilter;
    total: number;
}

export interface UpdateFieldPamas {
    id: number;
    field: string;
    value: any;
    type: string;
}

export default defineStore('user', () => {
    const dialogType = ref('create');
    const detail: UserItem = reactive({
        id: undefined,
        uuid: undefined,
        username: '',
        nickname: '',
        email: '',
        phone: '',
        password: '',
        avatar: '',
        isShow: STATUS.DISABLE,
        rule: RULE.USER,
        createdAt: undefined,
        updatedAt: undefined,
    });
    const defaultCache = cloneDeep(detail);
    const list: Ref<UserItem[]> = ref([]);
    const filter: UserFilter = reactive({
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

    const create = async (data = {}) => {
        const res = await createData(data);
        await find(filter);
        return res;
    };

    const update = async (data = {}) => {
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

    const isDialogUpdateVisible = ref(false);

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

    const openDialogUser = (type: string, id?: number) => {
        isDialogUpdateVisible.value = true;
        dialogType.value = type;
        if (type === 'create') {
            resetDetail();
        } else if (type === 'update' && id) {
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
        isDialogUpdateVisible,
        // resetDetail,
        // del,
        openDialogUser,
        dialogType,
    };
});
