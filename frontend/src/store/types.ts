export type AppState = {
  count: number;
  searchText: string;
  filterOptions: FilterOptions;
  modalOpen: boolean;
  currentProduct?: Product | null;
  viewMode: ViewMode;
};

export type FilterOptions = {
  kategorier: Kategorier;
  minVolum: number;
  maxVolum: number;
  minPrice: number;
  maxPrice: number;
};

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
};

export type ViewMode = {
  filterDisplay: FilterDisplay;
  initialLoad: boolean;
  initialSearch: boolean;
  initialFilter: boolean;
};

export type FilterDisplay = 'startMode' | 'searchMode' | 'filterMode';
