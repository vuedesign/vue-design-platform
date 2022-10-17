import { ListPageResponse } from '@/globals/types/global';

export type CountType = 'site' | 'code';

export interface CountItem {
    id?: number;
    sites: number;
    authorId: number;
    views: number;
    collections: number;
    top: number;
    down: number;
    type: CountType;
    createdAt?: string;
    updatedAt?: string;
}
export type CountList = CountItem[];
export interface CountListResponse extends ListPageResponse<CountList> {}
export type CountState = {
    countItem: CountItem | null;
};
