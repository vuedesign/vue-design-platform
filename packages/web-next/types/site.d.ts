import { ListPageResponse } from '../types/global'

export interface User {
  avatar: string
  username: string
}

export type SiteType = 'site' | 'code' | 'all'

export interface SiteItemType {
  thumbUrl: string
  id?: number
  title: string
  description: string
  tags: string[]
  user: User
  type: SiteType
}
export type SiteListType = SiteItemType[]
export type SiteListResponse = ListPageResponse<SiteListType>
