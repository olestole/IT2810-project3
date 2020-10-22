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

export const setFilterMode = (boolValue: boolean) => {
  return {
    type: 'FILTER_MODE',
    payload: boolValue
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


interface fieldAndBool {
  field: string;
  value: boolean;
}

export const filter = (filterAndBool: fieldAndBool) => {
  return {
    type: 'FILTER',
    payload: filterAndBool
  } as const;
};

interface fieldAndNumber {
  field: string;
  value: number;
}

export const filterVolumAndPrice = (fieldAndNumber: fieldAndNumber) => {
  return {
    type: 'FILTER_RANGE',
    payload: fieldAndNumber
  } as const;
};