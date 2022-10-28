import { ListPageResponse } from '@/globals/types/global';

export interface NavigationItem {
    id?: number;
    siteId: number;
    siteUrl: string;
    iconUrl: string;
    title: string;
    description: string;
    order: number;
    status: number;
    createdAt: string;
    updatedAt: string;
}
export type NavigationList = NavigationItem[];
export interface NavigationListResponse
    extends ListPageResponse<NavigationList> {}
