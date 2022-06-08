import { createContext } from 'react'
import type { SiteListType } from '../../types/site'
import type { SetDispatch } from '../../types/global'
import { FindSiteQuery } from '../../globals/apis'

export type SiteListContextType = {
  list: SiteListType
  setList: SetDispatch<SiteListType>
  total: number
  setTotal: SetDispatch<number>
  query: FindSiteQuery
  setQuery: SetDispatch<FindSiteQuery>
}

export const SiteListContext = createContext<SiteListContextType>(
  {} as SiteListContextType
)
