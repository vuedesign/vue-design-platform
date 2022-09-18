import { ListPageResponse } from '@/modules/types/global';

export interface User {
    id: number;
    uuid: string;
    username: string;
    nickname: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    status: number;
    rule: number;
}

export interface UserResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    account: string;
    password: string;
}

export type AuthState = {
    user: User | null;
    token: string | null;
};

export type UserList = User[];
export interface UserListResponse extends ListPageResponse<UserList> {}
export type UserState = {
    userItem: User | null;
};

export type LikeParamType = 'top' | 'down';
export interface LikeParam {
    type: LikeParamType;
    siteId: number;
}
