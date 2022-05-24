import { reactive, ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { findProfileData, loginData } from './api';
import { router } from '@/core';
import { setAuthorization } from '@/core/http';
import menuTree, { MenuNode } from '@/configs/menuTree';

const TOKEN_KEY = 'DESIGN_TOKEN';

export type TagItem = Record<string, any>;
export type TagFilter = Record<string, any>;
export type TagList = Array<TagItem>;
export interface Tag {
    list: TagList;
    filter: TagFilter;
    total: number;
}

export type Profile = Record<string, any>;
export interface GlobalState {
    profile: Profile;
    tag: Tag;
}

export interface LoginFormData {
    account: string;
    password: string;
}

interface Breadcrumb {
    label: string;
    path?: string;
    value: string;
}

// export type MenuNode = {
//     label: string;
//     value: string;
//     active?: boolean;
//     icon?: string;
//     children?: MenuNode[];
//     isOpen?: boolean;
// };

export default defineStore('global', () => {
    const profile: Profile = reactive({});
    const findProfile = async () => {
        const res = await findProfileData();
        Object.assign(profile, res);
        console.log('findProfile', res);
    };

    const token: ComputedGetter<string> = computed(
        () => window.localStorage.getItem(TOKEN_KEY) || '',
    );
    const setToken = (token: string): void => {
        window.localStorage.setItem(TOKEN_KEY, token);
    };
    const removeToken = (): void => {
        window.localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
    };

    const login = async (formData: LoginFormData): Promise<void> => {
        const res = await loginData(formData);
        setToken(res.token);
        setAuthorization(`Bearer ${res.token}`);
        router.push({
            name: 'home',
        });
    };

    const breadcrumbList: Ref<Breadcrumb[]> = ref([]);
    const menuList: Ref<MenuNode[]> = ref(menuTree);

    function setBreadcrumb(
        menuList: MenuNode[],
        breadcrumbList: Breadcrumb[],
        name: string,
        parent?: MenuNode,
    ) {
        const item = menuList.find((item: MenuNode) => item.value === name);
        if (item) {
            if (parent) {
                breadcrumbList.push(parent);
            }
            breadcrumbList.push({
                label: item.label,
                value: item.value,
            });
        } else {
            menuList.forEach((item) => {
                if (item.children) {
                    setBreadcrumb(item.children, breadcrumbList, name, item);
                }
            });
        }
    }

    function setActive(menuList: MenuNode[], name: string) {
        menuList.forEach((item) => {
            if (item.children && item.children) {
                setActive(item.children, name);
            } else {
                item.active = item.value === name;
            }
        });
    }

    const resetBreadcrumb = () => {
        breadcrumbList.value = [];
    };

    const pushBreadcrumb = (name: string) => {
        resetBreadcrumb();
        setBreadcrumb(menuList.value, breadcrumbList.value, name);
    };

    const resetActive = (name: string) => {
        setActive(menuList.value, name);
    };

    return {
        profile,
        findProfile,
        token,
        setToken,
        removeToken,
        login,
        menuList,
        breadcrumbList,
        pushBreadcrumb,
        resetBreadcrumb,
        resetActive,
    };
});
