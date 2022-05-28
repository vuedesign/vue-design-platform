import { Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';

export const useTableMaxHeight = (pageContainer: Ref<HTMLDivElement>) => {
    const tabelMaxheight = ref(0);
    onMounted(() => {
        if (pageContainer.value && pageContainer.value.clientHeight) {
            tabelMaxheight.value = pageContainer.value.clientHeight - 16;
        }
    });
    useResizeObserver(pageContainer, () => {
        if (pageContainer.value && pageContainer.value.clientHeight) {
            tabelMaxheight.value = pageContainer.value.clientHeight - 16;
        }
    });
    return tabelMaxheight;
};