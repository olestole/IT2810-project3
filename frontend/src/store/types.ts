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
  ol: boolean;
  musserende_vin: boolean;
  sterk_vin: boolean;
  annen_vin: boolean;
  brennevin: boolean;
  alkoholfritt: boolean;
  annet: boolean;
}