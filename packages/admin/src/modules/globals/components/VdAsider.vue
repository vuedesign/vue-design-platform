<template>
    <div class="vd-asider">
        <div class="logo">
            <a href="#"><img :src="logo" /></a>
        </div>
        <div class="menu">
            <vd-menu-item
                v-for="(item, index) in menuList"
                :key="index"
                v-bind="item"
                @toggle="handleToggle"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-asider',
};
</script>
<script setup lang="ts">
import logo from '@/assets/images/logo.png';
import { ref, Ref } from 'vue';
import VdMenuItem from './VdMenuItem.vue';

type MenuNode = {
    label: string;
    value: string;
    active?: boolean;
    icon?: string;
    children?: MenuNode[];
    isOpen?: boolean;
};

const menuList: Ref<MenuNode[]> = ref([
    {
        label: '用户管理',
        value: 'user',
        active: true,
        icon: 'user',
    },
    {
        label: '素材管理',
        value: 'material',
        icon: 'picture-one',
    },
    {
        label: '埋点管理',
        value: 'buried',
        icon: 'broadcast',
    },
    {
        label: '配置管理',
        value: 'config',
        icon: 'folder-open',
        isOpen: true,
        children: [
            {
                label: '首页导航管理',
                value: 'home-nav',
                icon: 'navigation',
            },
        ],
    },
]);

const handleToggle = (value) => {
    const item = menuList.value.find((item) => item.value === value);
    if (item) {
        item.isOpen = !item.isOpen;
    }
    console.log('value', value);
};
</script>

<style scoped lang="scss">
.vd-asider {
    width: 280px;
    height: 100%;
}
.logo {
    height: 54px;
    padding: 13px 24px;
    box-sizing: border-box;
    a {
        display: flex;
        box-sizing: border-box;
    }
    img {
        width: auto;
        height: 28px;
    }
}
.menu {
    padding: 5px 24px;
    font-size: 14px;
}
</style>
