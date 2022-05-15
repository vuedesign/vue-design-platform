<template>
    <div class="vd-container">
        <vd-header />
        <div class="vd-body">
            <vd-asider />
            <div class="vd-mainer">
                <router-view />
            </div>
            <div class="vd-footer"></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-container',
};
</script>
<script setup lang="ts">
import VdHeader from './VdHeader.vue';
import VdAsider from './VdAsider.vue';
</script>

<style scoped>
.vd-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.vd-body {
    flex: 1;
    overflow: hidden;
    width: 100%;
}
</style>
