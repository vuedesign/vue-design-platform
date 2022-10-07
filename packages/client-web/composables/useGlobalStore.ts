import { defineStore } from 'pinia';

const { AUTH_PROFILE, AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } = useApis();

export type TagItem = Record<string, any>;
export type TagFilter = Record<string, any>;
export type TagList = Array<TagItem>;
export interface Tag {
    list: TagList;
    filter: TagFilter;
    total: number;
}

export interface Profile {
    id: number;
    uuid: string;
    username: string;
    nickname: string;
    email: string;
    phone: string;
    avatar: string;
    isShow: number;
    rule: null;
    createdAt: string;
    updatedAt: string;
}
export interface GlobalState {
    profile: Profile;
    pending: boolean;
    refresh: Function;
    tag: Tag;
}

export interface LoginFormData {
    account: string;
    password: string;
}

export type RegisterFormData = LoginFormData;

export interface LoginData {
    sub: number;
    token: string;
    username: string;
}

export default defineStore('global', {
    state: (): GlobalState => ({
        profile: {} as Profile,
        pending: true,
        refresh: () => {},
        tag: {
            list: [],
            filter: {},
            total: 0,
        },
    }),
    getters: {
        tagList: (state) => state.tag.list,
        tagTotal: (state) => state.tag.total,
    },
    actions: {
        async findProfile() {
            const { data, pending, refresh } = await useLazyAsyncData(
                'profile',
                () => ajaxGet<Profile>(AUTH_PROFILE),
            );
            return { data, pending, refresh };
        },
        refreshProfile() {
            this.refresh && this.refresh.call(this);
        },
        async login(formData: LoginFormData): Promise<void> {
            const res = await ajaxPost<LoginData>(AUTH_LOGIN, formData);
            console.log('res', res);
            setToken(res.token);
            navigateTo({
                path: '/',
            });
        },
        async logout() {
            const res = await ajaxGet<boolean>(AUTH_LOGOUT);
            if (res) {
                navigateTo({
                    path: '/login',
                });
            }
            console.log('res===', res);
        },
        register(formData: RegisterFormData) {
            return ajaxPost<any>(AUTH_REGISTER, formData);
        },
    },
});
