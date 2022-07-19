import { ListPageResponse } from "../types/global";

export interface User {
  avatar: string;
  username: string;
}

export type SiteType = "site" | "code";

export interface SiteItemType {
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
  tagIds: string;
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
export type SiteListType = SiteItemType[];
export interface SiteListResponse extends ListPageResponse<SiteListType> {}
