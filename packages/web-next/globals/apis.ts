import * as apis from './apis.contant'
import { AxiosRequestConfig } from 'axios'
import ajax from './ajax'
import { SiteListResponse, SiteType } from '../types/site'
import { NavigationListResponse } from '../types/navigation'

export interface FindSiteQuery {
  size: number
  page: number
  type?: SiteType
}

export function findSite(query?: FindSiteQuery): Promise<SiteListResponse> {
  const params = query as AxiosRequestConfig<FindSiteQuery>
  return ajax.get(apis.SITES, { params })
}

export function findNav(): Promise<NavigationListResponse> {
  return ajax.get(apis.NAVIGATIONS)
}
