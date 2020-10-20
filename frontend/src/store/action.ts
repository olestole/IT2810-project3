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
    payload: text
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