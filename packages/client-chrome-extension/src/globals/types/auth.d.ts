import { ListPageResponse } from '@/globals/types/global';

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

export type TooItemType = 'top' | 'down' | 'collections';
export interface LikeParam {
    type: TooItemType;
    siteId: number;
    value: number;
}

export type BufferJSON = {
    type: 'Buffer';
    data: number[];
};
