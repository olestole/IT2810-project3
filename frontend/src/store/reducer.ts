import { createStore, combineReducers, Store } from 'redux';
import { decrement, increment, setSearchText, filter, filterVolumAndPrice, setFilterMode } from './action';
import { AppState, FilterOptions } from './types';

type Actions = ReturnType<typeof increment> | ReturnType<typeof decrement> | ReturnType<typeof setFilterMode> | ReturnType<typeof setSearchText> | ReturnType<typeof filter> | ReturnType<typeof filterVolumAndPrice>;

const initialAppState: AppState = {
  count: 0,
  searchText: "",
  filterOptions: {
    filterMode: false,
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
    case 'FILTER_MODE':
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          filterMode: action.payload,
        }
      };
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload
      };
    case 'FILTER':
      return {
        ...state,
        filterOptions: {
            ...state.filterOptions,
            kategorier: {
              ...state.filterOptions.kategorier,
              [action.payload.field]: action.payload.value  
          }
        }
      };
    case 'FILTER_RANGE':
      return {
        ...state,
        filterOptions: {
            ...state.filterOptions,
            [action.payload.field]: action.payload.value  
        }
      }
    default:
      neverReached(action);
  }
  return state;
};

const neverReached = (never: never) => {};

//Utility-funksjon for å kombinere flere reducere
// const rootReducer = combineReducers<AppState>({
//   count: countReducer,
// });

function configureStore(): Store<AppState> {
  return createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

//Oppretter en store
export const store = configureStore();
