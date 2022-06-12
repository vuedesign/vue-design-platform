<template>
    <div class="vd-container">
        <vd-asider />
        <div class="vd-body">
            <vd-header />
            <div class="vd-mainer">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-container',
};
</script>
<script setup lang="ts">
import VdHeader from '../components/VdHeader.vue';
import VdAsider from '../components/VdAsider.vue';
</script>

<style scoped>
.vd-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #f2f3f5;
}
.vd-body {
    flex: 1;
    overflow: hidden;
    width: 100%;
    padding-right: 24px;
    display: flex;
    flex-direction: column;
}
.vd-mainer {
    flex: 1;
    padding-bottom: 16px;
    overflow: hidden;
    display: flex;
}
</style>
