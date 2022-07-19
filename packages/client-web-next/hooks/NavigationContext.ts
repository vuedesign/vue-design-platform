import { createContext } from "react";
import type { NavigationListType } from "../types/navigation";
import type { ListPageResponse } from "../types/global";

export interface NavigationContextType
  extends ListPageResponse<NavigationListType> {}

export const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
);
