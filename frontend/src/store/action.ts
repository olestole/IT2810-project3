import { IReview, Product } from 'types/globalTypes';
import { fieldAndBool, FilterDisplay, fieldAndNumber } from './types';

export const setFilterMode = (boolValue: boolean) => {
  return {
    type: 'FILTER_MODE',
    payload: boolValue,
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

export const setAddedReview = (review: IReview | null) => {
  return {
    type: 'SET_ADDED_REVIEW',
    payload: review,
  } as const;
};

export const filter = (filterAndBool: fieldAndBool) => {
  return {
    type: 'FILTER',
    payload: filterAndBool,
  } as const;
};

export const filterVolumAndPrice = (fieldAndNumber: fieldAndNumber) => {
  return {
    type: 'FILTER_RANGE',
    payload: fieldAndNumber,
  } as const;
};

export const updateViewMode = (filterAndBool: fieldAndBool) => {
  return {
    type: 'UPDATE_VIEW_MODE',
    payload: filterAndBool,
  } as const;
};

export const updateFilterDisplay = (value: FilterDisplay) => {
  return {
    type: 'UPDATE_FILTER_DISPLAY',
    payload: value,
  } as const;
};

export const resetFilter = () => {
  return {
    type: 'RESET_FILTER',
  } as const;
};
