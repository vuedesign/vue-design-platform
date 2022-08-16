import { ListPageResponse } from '@/globals/types/global';

export interface User {
  avatar: string;
  username: string;
}

export type SiteType = 'site' | 'code';

export interface TagItem {
  id: number;
  name: string;
  description: string;
}
export type TagList = TagItem[];

export interface SiteItem {
  id?: number;
  uuid?: string;
  title: string;
  thumbUrl: string;
  logoUrl: string;
  iconUrl: string;
  siteUrl: string;
  codeUrl: string;
  description: string;
  authorId: number;
  tags: TagList;
  views: number;
  collections: number;
  top: number;
  down: number;
  type: SiteType;
  status: number;
  author: User;
  createdAt?: string;
  updatedAt?: string;
}
export type SiteList = SiteItem[];
export interface SiteListResponse extends ListPageResponse<SiteList> {}
export type SiteState = {
  siteItem: SiteItem | null;
};
