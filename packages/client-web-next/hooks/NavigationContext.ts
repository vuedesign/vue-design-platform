import { createContext } from "react";
import type { NavigationListType } from "../types/navigation";
import type { ListPageResponse } from "../types/global";

export interface User {
  id: number;
  uuid: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
  status: number;
  rule: number;
}
export interface NavigationContextType
  extends ListPageResponse<NavigationListType> {
  profile: User;
}

export const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
);
