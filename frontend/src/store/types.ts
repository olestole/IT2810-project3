import { IReview, Product } from 'types/globalTypes';

export type AppState = {
  searchText: string;
  filterOptions: FilterOptions;
  modalOpen: boolean;
  currentProduct?: Product | null;
  viewMode: ViewMode;
  addedReview?: IReview[] | null;
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
  initialLoad: boolean;
};

export interface fieldAndBool {
  field: string;
  value: boolean;
}

export interface fieldAndNumber {
  field: string;
  value: number;
}

export type FilterDisplay = 'startMode' | 'searchMode' | 'filterMode';
