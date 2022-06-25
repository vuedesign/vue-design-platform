import { createContext } from 'react'
import type { NavigationListType } from '../../types/navigation'

export type NavigationListContextType = {
  navList: NavigationListType
}

export const NavigationListContext = createContext<NavigationListContextType>(
  {} as NavigationListContextType
)
