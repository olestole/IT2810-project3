import { createStore, Store } from 'redux';
import { decrement, increment, setSearchText, setCurrentProduct, setModalOpen } from './action';
import { AppState } from './types';

type Actions =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof setSearchText>
  | ReturnType<typeof setCurrentProduct>
  | ReturnType<typeof setModalOpen>;

const initialAppState: AppState = {
  count: 0,
  searchText: '',
  modalOpen: false,
};

const rootReducer = (state: AppState = initialAppState, action: Actions) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload,
      };
    case 'SET_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: action.payload,
      };
    case 'SET_MODAL_OPEN':
      return {
        ...state,
        modalOpen: action.payload,
      };
    default:
      neverReached(action);
  }
  return state;
};

const neverReached = (never: never) => {};

function configureStore(): Store<AppState> {
  return createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

//Oppretter en store
export const store = configureStore();
