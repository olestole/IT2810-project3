import { Product } from 'types/globalTypes';

export const increment = () => {
  return {
    type: 'INCREMENT',
  } as const;
};

export const decrement = () => {
  return {
    type: 'DECREMENT',
  } as const;
};

export const setSearchText = (text: string) => {
  return {
    type: 'SET_SEARCH_TEXT',
    payload: text,
  } as const;
};

export const setCurrentProduct = (product: Product | null) => {
  return {
    type: 'SET_CURRENT_PRODUCT',
    payload: product,
  } as const;
};

export const setModalOpen = (value: boolean) => {
  return {
    type: 'SET_MODAL_OPEN',
    payload: value,
  } as const;
};
