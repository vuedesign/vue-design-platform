import { findData, findOneData, updateData } from './api';
import { Ref } from 'vue';
import { TAG_STORE_KEY } from '@/configs/storeKeys';
import { ListFilter, BaseItem } from '@/types/globals';

export interface TagItem extends BaseItem {
    id?: number;
    name: string;
    description: string;
}
export type TagList = Array<TagItem>;
export interface TagListFilter extends ListFilter {
    name?: string;
}

export default defineStore(TAG_STORE_KEY, () => {
    const drawerType = ref('create');
    const detail: TagItem = reactive({
        id: undefined,
        name: '',
        description: '',
    });
    const list: Ref<TagItem[]> = ref([]);
    const filter: TagListFilter = reactive({
        page: 1,
        size: 20,
        name: '',
    });
    const total = ref(0);

    const find = async (query?: TagListFilter) => {
        Object.assign(filter, query);
        const res = await findData(filter);
        list.value = res.list;
        total.value = res.total;
    };
    const findOne = async (id: number) => {
        const res = await findOneData(id);
        Object.assign(detail, res);
    };

    const update = async (data: TagItem) => {
        const res = await updateData(data);
        await find(filter);
        return !!res.affected;
    };

    const isDrawerUpdateVisible = ref(false);

    const openDrawerTag = (type: string, id?: number) => {
        drawerType.value = type;
        if (type === 'update' && id) {
            isDrawerUpdateVisible.value = true;
            findOne(id);
        }
    };

    return {
        detail,
        list,
        total,
        filter,
        find,
        findOne,
        update,
        isDrawerUpdateVisible,
        openDrawerTag,
        drawerType,
    };
});
