interface PaginatedInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface PaginatedResponse<T> {
  info: PaginatedInfo;
  results: T[];
}
