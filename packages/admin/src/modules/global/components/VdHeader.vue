<template>
    <div class="vd-header">
        <div class="vd-header-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <iconpark-icon name="home"></iconpark-icon>
                    <span class="label">首页</span>
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
                    <el-popover placement="bottom" :width="300" trigger="click">
                        <template #reference>
                            <iconpark-icon
                                name="messages-one"
                                :size="16"
                            ></iconpark-icon>
                        </template>
                        <el-table :data="gridData">
                            <el-table-column
                                width="auto"
                                property="message"
                                label="系统消息"
                            >
                                <template #default="{ row }">
                                    <router-link :to="{ path: '/' }">
                                        {{ row.message }}
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="110"
                                property="date"
                                label="时间"
                            />
                        </el-table>
                    </el-popover>
                </li>
                <li>
                    <el-dropdown
                        placement="bottom-end"
                        trigger="click"
                        popper-class="vd-profile"
                    >
                        <el-avatar :size="32" :src="profile.avatar">
                            <iconpark-icon name="me" :size="16"></iconpark-icon>
                        </el-avatar>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <iconpark-icon
                                        name="id-card"
                                    ></iconpark-icon>
                                    <span class="menu-text">个人中心</span>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <iconpark-icon name="share"></iconpark-icon>
                                    <span class="menu-text">分享</span>
                                </el-dropdown-item>
                                <el-dropdown-item divided>
                                    <iconpark-icon name="power"></iconpark-icon>
                                    <span class="menu-text">退出</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
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

const gridData = [
    {
        date: '2016-05-02',
        message: 'New York City',
    },
    {
        date: '2016-05-04',
        message: 'New York City',
    },
    {
        date: '2016-05-01',
        message: 'New York City',
    },
    {
        date: '2016-05-03',
        message: 'New York City',
    },
];
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

    .label,
    iconpark-icon {
        display: inline-block;
        vertical-align: middle;
    }
    .label {
        margin-left: 3px;
    }
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

.vd-profile {
    .menu-text {
        margin-left: 8px;
        display: inline-block;
    }
}
</style>
