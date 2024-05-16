interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
interface PaginationMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
