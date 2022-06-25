import { defineStore } from 'pinia';
import { findProfileData, loginData, findTagData } from './api';
import { router, setAuthorization } from '@/core';

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

export default defineStore('global', {
    state: (): GlobalState => ({
        profile: {},
        tag: {
            list: [],
            filter: {},
            total: 0,
        },
    }),
    getters: {
        token: (): string => {
            const token = window.localStorage.getItem(TOKEN_KEY);
            return token || '';
        },
        tagList: (state) => state.tag.list,
        tagTotal: (state) => state.tag.total,
    },
    actions: {
        async findProfile() {
            this.profile = await findProfileData();
            console.log('findProfile', this.profile);
        },
        async login(formData: LoginFormData): Promise<void> {
            const res = await loginData(formData);
            this.setToken(res.token);
            setAuthorization(`Bearer ${res.token}`);
            console.log('router', router);
            router.push({
                name: 'project',
            });
        },
        async findTag() {
            const res = await findTagData();
            this.tag.list = res.list;
            this.tag.total = res.total;
            // console.log('findTag', res);
        },
        setToken(token: string): void {
            window.localStorage.setItem(TOKEN_KEY, token);
        },
        removeToken(): void {
            window.localStorage.removeItem(TOKEN_KEY);
            window.location.reload();
        },
    },
});
