import { reactive, Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { findData, findOneData } from './api';
import { STATUS, RULE } from './constants';
import { COUNT_STORE_KEY } from '@/configs/storeKeys';

export interface CountItem {
    id?: number;
    authorId: number;
    sites: number;
    views: number;
    collections: number;
    top: number;
    down: number;
    type: string;
    createdAt: string;
    updatedAt: string;
}
export type CountList = Array<CountItem>;
export interface CountFilter {
    page: number;
    size: number;
    order: string;
    status: number;
    search: string;
}
export interface CountState {
    detail: CountItem;
    list: CountList;
    filter: CountFilter;
    total: number;
}

export interface UpdateFieldPamas {
    id: number;
    field: string;
    value: any;
    type: string;
}

export default defineStore(COUNT_STORE_KEY, () => {
    const detail: CountItem = reactive({
        id: undefined,
        authorId: 0,
        sites: 0,
        views: 0,
        collections: 0,
        top: 0,
        down: 0,
        type: '',
        createdAt: '',
        updatedAt: '',
    });
    const list: Ref<CountItem[]> = ref([]);
    const filter: CountFilter = reactive({
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

    return {
        list,
        total,
        filter,
        find,
        findOne,
    };
});
