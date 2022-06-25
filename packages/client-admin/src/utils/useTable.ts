import { Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { dateFormat } from './index';

export const useTableMaxHeight = (pageContainer: Ref<HTMLDivElement>) => {
    const tabelMaxheight = ref(0);
    onMounted(() => {
        if (pageContainer.value && pageContainer.value.clientHeight) {
            tabelMaxheight.value = pageContainer.value.clientHeight;
        }
    });
    useResizeObserver(pageContainer, () => {
        if (pageContainer.value && pageContainer.value.clientHeight) {
            tabelMaxheight.value = pageContainer.value.clientHeight;
        }
    });
    return tabelMaxheight;
};

export const tableDateFormatter = (dateType: string) => {
    return (row: Record<string, string>): string => {
        return dateFormat(row[dateType]);
    };
};
