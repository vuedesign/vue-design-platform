export interface Pagination {
  page: number
  size: number
}

export interface ListPageResponse<T> {
  list: T
  pagination: Pagination
  total: number
}
