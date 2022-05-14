import * as apis from './apis.contant'
import { AxiosRequestConfig } from 'axios'
import ajax from './ajax'
import { SiteListResponse, SiteType } from '../types/site'

export interface FindSiteQuery {
  size: number
  page: number
  type: SiteType
}

export function findSite(query?: FindSiteQuery): Promise<SiteListResponse> {
  const params = query as AxiosRequestConfig<FindSiteQuery>
  return ajax.get(apis.SITES, { params })
}
