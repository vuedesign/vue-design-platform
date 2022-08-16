import { createContext } from 'react';
import type { NavigationList } from '../types/navigation';
import type { ListPageResponse } from '../types/global';
import type { User } from '@/modules/auth/types';

export interface NavigationContextType
  extends ListPageResponse<NavigationList> {
  profile: User;
}

export const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType,
);
