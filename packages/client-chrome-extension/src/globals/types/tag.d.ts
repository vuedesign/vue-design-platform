import { ListPageResponse } from '@/globals/types/global';

export interface TagItem {
    id?: number;
    name: string;
    description?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
}
export type TagList = TagItem[];
export interface TagListResponse extends ListPageResponse<TagList> {}
export type TagState = {
    tagItem: TagItem | null;
};
