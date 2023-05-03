export default interface PaginationDto {
  page?: number;
  per_page?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}
