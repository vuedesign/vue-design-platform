<template>
    <div class="vd-asider">
        <div class="logo">
            <a href="javascript:void(0)" @click="handleGotoHome">
                <img :src="logo" />
            </a>
        </div>
        <div class="menu">
            <vd-menu-item
                v-for="(item, index) in menuList"
                :key="index"
                v-bind="item"
                @toggle="handleToggle"
                @goto="handleGoto"
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
import VdMenuItem from './VdMenuItem.vue';
import { MenuNode } from '@/configs/menuTree';
import { useGlobalStore } from '../useGlobalStore';

const globalStore = useGlobalStore();
const { menuList } = storeToRefs(globalStore);

const handleToggle = (value: string) => {
    const item: MenuNode | undefined = menuList.value.find(
        (item: MenuNode) => item.value === value,
    );
    if (item) {
        item.isOpen = !item.isOpen;
    }
};

const router = useRouter();
const route = useRoute();

globalStore.resetActive(route.name as string);
globalStore.pushBreadcrumb(route.name as string);

const handleGoto = (props: MenuNode) => {
    const name = props.value;
    globalStore.resetActive(name);
    globalStore.pushBreadcrumb(name);
    router.push({
        name,
    });
};

const handleGotoHome = () => {
    router.push({
        name: 'home',
    });
};
</script>

<style scoped lang="scss">
.vd-asider {
    width: 240px;
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
