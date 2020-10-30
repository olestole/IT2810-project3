import { createStore, Store } from 'redux';
import { AppState } from './types';
import {
  setSearchText,
  filter,
  filterVolumAndPrice,
  setFilterMode,
  setCurrentProduct,
  setModalOpen,
  updateViewMode,
  updateFilterDisplay,
  resetFilter,
  setAddedReview,
} from './action';

type Actions =
  | ReturnType<typeof setSearchText>
  | ReturnType<typeof setCurrentProduct>
  | ReturnType<typeof setModalOpen>
  | ReturnType<typeof setFilterMode>
  | ReturnType<typeof filter>
  | ReturnType<typeof filterVolumAndPrice>
  | ReturnType<typeof updateViewMode>
  | ReturnType<typeof updateFilterDisplay>
  | ReturnType<typeof resetFilter>
  | ReturnType<typeof setAddedReview>;

const initialAppState: AppState = {
  searchText: '',
  modalOpen: false,
  filterOptions: {
    kategorier: {
      rodvin: false,
      hvitvin: false,
      musserende_vin: false,
      sterk_vin: false,
      annen_vin: false,
      ol: false,
      brennevin: false,
      alkoholfritt: false,
      annet: false,
    },
    minVolum: 0,
    maxVolum: 10,
    minPrice: 0,
    maxPrice: 2000000,
  },
  viewMode: {
    initialLoad: false,
  },
};

const rootReducer = (state: AppState = initialAppState, action: Actions) => {
  switch (action.type) {
    case 'FILTER_MODE':
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          filterMode: action.payload,
        },
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
    case 'FILTER':
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          kategorier: {
            ...state.filterOptions.kategorier,
            [action.payload.field]: action.payload.value,
          },
        },
      };
    case 'FILTER_RANGE':
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'UPDATE_VIEW_MODE':
      return {
        ...state,
        viewMode: {
          ...state.viewMode,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'UPDATE_FILTER_DISPLAY':
      return {
        ...state,
        viewMode: {
          ...state.viewMode,
          filterDisplay: action.payload,
        },
      };
    case 'RESET_FILTER':
      return {
        ...state,
        filterOptions: {
          kategorier: {
            rodvin: false,
            hvitvin: false,
            ol: false,
            musserende_vin: false,
            sterk_vin: false,
            annen_vin: false,
            brennevin: false,
            alkoholfritt: false,
            annet: false,
          },
          minVolum: 0,
          maxVolum: 10,
          minPrice: 0,
          maxPrice: 2000000,
        },
      };
    case 'SET_ADDED_REVIEW':
      return {
        ...state,
        addedReview: action.payload
          ? state.addedReview
            ? [...state.addedReview, action.payload]
            : [action.payload]
          : null,
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
