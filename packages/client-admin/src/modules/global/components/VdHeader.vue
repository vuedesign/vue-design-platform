<template>
    <div class="vd-header">
        <div class="vd-header-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <el-icon>
                        <home />
                    </el-icon>
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
                            <el-icon :size="16">
                                <messages-one />
                            </el-icon>
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
                        @command="handleUserMenuCommand"
                    >
                        <el-avatar :size="32" :src="profile.avatar">
                            <el-icon :size="16"><me /></el-icon>
                        </el-avatar>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-for="item in userMenuList"
                                    :key="item.value"
                                    :divided="item.divided"
                                    :command="item.value"
                                >
                                    <el-space>
                                        <el-icon>
                                            <component :is="item.icon" />
                                        </el-icon>
                                        <span>{{ item.label }}</span>
                                    </el-space>
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
import {
    Home,
    IdCard,
    Share,
    Power,
    Me,
    MessagesOne,
} from '@icon-park/vue-next';
import { ConcreteComponent, ShallowRef } from 'vue';
import { useGlobalStore } from '../useGlobalStore';
const globalStore = useGlobalStore();
const { breadcrumbList, profile } = storeToRefs(globalStore);
globalStore.findProfile();

interface UserMenuItem {
    value: string;
    label: string;
    divided?: boolean;
    icon: ConcreteComponent;
}
const userMenuList: ShallowRef<UserMenuItem[]> = shallowRef([
    {
        value: 'mine',
        label: '个人中心',
        icon: IdCard,
    },
    {
        value: 'share',
        label: '分享',
        icon: Share,
    },
    {
        value: 'logout',
        label: '退出',
        divided: true,
        icon: Power,
    },
]);
const handleUserMenuCommand = (command: string) => {
    console.log('command', command);
    switch (command) {
        case 'logout':
            globalStore.removeToken();
            break;
    }
};
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
    .label {
        margin-left: 3px;
        display: inline-block;
        vertical-align: middle;
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
        > i {
            color: #666;
            display: inline-block;
            vertical-align: middle;
        }
        &:hover {
            background-color: rgba(#3d7eff, 0.2);
            border-radius: 4px;
            > i {
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
