import { createContext, Dispatch, SetStateAction } from 'react'
import type { SiteListType } from '../../types/site'
import { FindSiteQuery } from '../../globals/apis'

type SetDispatch<T> = Dispatch<SetStateAction<T>>
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
