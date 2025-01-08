export interface PaginationResponse<T = unknown> {
  page: number;
  pageSize: number;
  totalCount?: number;
  data?: T;
}
