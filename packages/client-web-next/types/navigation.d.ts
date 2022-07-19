import { ListPageResponse } from "./global";

export interface NavigationItemType {
  id?: number;
  iconUrl: string;
  siteUrl: string;
  title: string;
  description: string;
  order: number;
  isShow: number;
}
export type NavigationListType = NavigationItemType[];
export interface NavigationListResponse
  extends ListPageResponse<NavigationListType> {}
