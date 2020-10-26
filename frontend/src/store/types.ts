import { Product } from 'types/globalTypes';

export type AppState = {
  count: number;
  searchText: string;
  modalOpen: boolean;
  currentProduct?: Product | null;
};
