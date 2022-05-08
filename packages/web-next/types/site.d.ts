export interface User {
  avatar: string
  username: string
}

export type SiteType = 'site' | 'code'

export interface SiteItemType {
  thumb: string
  id?: number
  title: string
  description: string
  tags: string[]
  user: User
  type: SiteType
}
