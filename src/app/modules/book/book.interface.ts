export type IBookFilterRequest = {
  search?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  category?: string | undefined;
  price?: number | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
};
