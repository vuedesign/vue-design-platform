<template>
    <div class="vd-body">
        <div class="vd-container">
            <router-view />
        </div>
        <div class="vd-footer">
            <var-bottom-navigation
                v-model:active="active"
                @change="handleChange"
            >
                <var-bottom-navigation-item
                    v-for="item in navList"
                    :label="item.label"
                    :icon="item.icon"
                    :key="item.value"
                />
            </var-bottom-navigation>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-container',
};
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const navList = reactive([
    {
        value: 'home',
        label: '首页',
        icon: 'home',
    },
    {
        value: 'manage',
        label: '管理',
        icon: 'cog',
    },
    {
        value: 'report',
        label: '报表',
        icon: 'white-balance-sunny',
    },
    {
        value: 'mine',
        label: '我的',
        icon: 'account-circle',
    },
]);
const active = ref(0);
const router = useRouter();
const route = useRoute();

navList.forEach((item, index) => {
    if (item.value === route.name) {
        active.value = index;
    }
});

console.log('route', route.name);
const handleChange = (active: string | number) => {
    router.push({
        name: `${navList[active].value}`,
    });
};
</script>

<style scoped>
.vd-body {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: #f9f9f9;
    flex-direction: column;
}
.vd-container {
    flex: 1;
    overflow: hidden;
}
.vd-footer {
    height: 64px;
    background-color: #fff;
}
</style>
