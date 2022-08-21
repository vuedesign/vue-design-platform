import { createContext, Dispatch, SetStateAction } from 'react';

export type SetDispatch<T> = Dispatch<SetStateAction<T>>;

export interface Pagination {
  page: number;
  size: number;
}

export interface ListPageResponse<T> {
  list: T;
  pagination: Pagination;
  total: number;
}

export interface LoginFormData {
  account: string;
  password: string;
  remember: boolean;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
