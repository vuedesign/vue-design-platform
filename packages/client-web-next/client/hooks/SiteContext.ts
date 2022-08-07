import { createContext } from 'react';
import type { SiteList } from '../../types/site';
import type { SetDispatch, ListPageResponse } from '../../types/global';

interface FindSiteQuery {}

export interface SiteContextType extends ListPageResponse<SiteList> {
  setList: SetDispatch<SiteList>;
  setTotal: SetDispatch<number>;
  query: FindSiteQuery;
  setQuery: SetDispatch<FindSiteQuery>;
}

export const SiteContext = createContext<SiteContextType>(
  {} as SiteContextType,
);
