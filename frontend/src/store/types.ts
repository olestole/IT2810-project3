export type AppState = {
  count: number;
  searchText: string;
  filterOptions: FilterOptions;
};

export type FilterOptions = {
  kategorier: Kategorier;
  volum: string;
  minPrice: string;
  maxPrice: string;
}

export type Kategorier = {
  [key: string]: boolean;
  rodvin: boolean;
  hvitvin: boolean;
  portvin: boolean;
  musserende_vin: boolean;
}