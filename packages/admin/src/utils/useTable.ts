export const useTableMaxHeight = (pageContainer) => {
    const tabelMaxheight = ref(0);
    onMounted(() => {
        if (pageContainer.value && pageContainer.value.clientHeight) {
            tabelMaxheight.value = pageContainer.value.clientHeight - 16;
        }
    });
    return tabelMaxheight;
};
