import { createContext } from "react";
import type { SiteListResponse, SiteListType } from "../types/site";
import type { SetDispatch, ListPageResponse } from "../types/global";
import { FindSiteQuery } from "../../globals/apis";

export interface SiteContextType extends ListPageResponse<SiteListType> {
  setList: SetDispatch<SiteListType>;
  setTotal: SetDispatch<number>;
  query: FindSiteQuery;
  setQuery: SetDispatch<FindSiteQuery>;
}

export const SiteContext = createContext<SiteContextType>(
  {} as SiteContextType
);
