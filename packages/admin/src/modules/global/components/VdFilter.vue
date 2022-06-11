<template>
    <div class="vd-filter">
        <div class="vd-filter-inner">
            <slot
                :input="inputStyle"
                :button="buttonStyle"
                :select="selectStyle"
            />
        </div>
        <div class="vd-filter-right" v-if="slots.right">
            <slot
                name="right"
                :input="inputStyle"
                :button="buttonStyle"
                :select="selectStyle"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-filter',
};
</script>
<script setup lang="ts">
const slots = useSlots();
const commonStyle = {
    verticalAlign: 'middle',
    marginBottom: '12px',
};
const inputStyle = Object.assign({}, commonStyle, {
    width: '200px',
    marginRight: '8px',
});
const selectStyle = Object.assign({}, commonStyle, {
    width: '200px',
    marginRight: '8px',
});
const buttonStyle = Object.assign({}, commonStyle, {
    width: '80px',
});
</script>

<style scoped lang="scss">
.vd-filter {
    display: flex;
    padding: 16px 24px;
}

.vd-filter-inner {
    flex: 1;
    margin-bottom: -12px;
}

.vd-filter-right {
    width: auto;
    margin-bottom: -12px;
}
</style>
