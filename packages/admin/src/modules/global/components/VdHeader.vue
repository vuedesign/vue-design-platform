<template>
    <div class="vd-header">
        <div class="vd-header-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">
                    首页
                </el-breadcrumb-item>
                <el-breadcrumb-item
                    v-for="item in breadcrumbList"
                    :key="item.value"
                >
                    {{ item.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="vd-header-user" v-if="profile && profile.id">
            <ul>
                <li>
                    <iconpark-icon
                        name="messages-one"
                        :size="16"
                    ></iconpark-icon>
                </li>
                <li>
                    <el-avatar :size="32" :src="profile.avatar">
                        <iconpark-icon name="me" :size="16"></iconpark-icon>
                    </el-avatar>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'vd-header',
};
</script>
<script setup lang="ts">
import useGlobalStore from '../useGlobalStore';
const globalStore = useGlobalStore();
const { breadcrumbList, profile } = storeToRefs(globalStore);
globalStore.findProfile();
</script>

<style scoped lang="scss">
.vd-header {
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.vd-header-breadcrumb {
    flex: 1;
}
.vd-header-user {
    height: 32px;

    ul {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    li {
        display: flex;
        width: 32px;
        height: 32px;
        align-items: center;
        justify-content: center;
        margin-left: 12px;

        border-radius: 16px;
        cursor: pointer;
        background-color: transparent;
        transition: all 0.5s;
        > iconpark-icon {
            color: #666;
        }
        &:hover {
            background-color: rgba(#3d7eff, 0.2);
            border-radius: 4px;
            > iconpark-icon {
                color: #3d7eff;
            }
        }
    }
}
</style>
