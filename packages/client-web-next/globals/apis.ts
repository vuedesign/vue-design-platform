import * as apis from "./apis.contants";
import { AxiosRequestConfig } from "axios";
import ajax from "./ajax";
import { SiteListResponse, SiteType } from "../types/site";
import { NavigationListResponse } from "../types/navigation";

export interface FindSiteQuery {
  size: number;
  page: number;
  type?: SiteType;
}

export function loginData(body: Record<string, string>): Promise<any> {
  return ajax.post(apis.AUTH_LOGIN, body);
}

export function profileData(): Promise<any> {
  return ajax.get(apis.AUTH_PROFILE);
}

export function findSiteData(query?: FindSiteQuery): Promise<SiteListResponse> {
  const params = query as AxiosRequestConfig<FindSiteQuery>;
  return ajax.get(apis.SITES, { params });
}

export function findNavData(): Promise<NavigationListResponse> {
  return ajax.get(apis.NAVIGATIONS);
}
