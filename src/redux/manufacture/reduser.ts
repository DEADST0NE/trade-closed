import {
  MANUFACTURERS_GET_REQUEST,
  MANUFACTURERS_GET_SUCCESS,
  MANUFACTURERS_GET_ERROR,
  MANUFACTUR_POST_REQUEST,
  MANUFACTUR_POST_SUCCESS,
  MANUFACTUR_POST_ERROR,
  MANUFACTUR_PUT_REQUEST,
  MANUFACTUR_PUT_SUCCESS,
  MANUFACTUR_PUT_ERROR,
  MANUFACTUR_DELETE_REQUEST,
  MANUFACTUR_DELETE_SUCCESS,
  MANUFACTUR_DELETE_ERROR,
  MANUFACTURERS_LAZY_SUCCESS,
  MANUFACTURERS_LAZY_REQUEST,
  MANUFACTURERS_SEARCH_REQUEST,
  MANUFACTURERS_SEARCH_SUCCESS,
  MANUFACTURERS_SEARCH_ERROR,
} from '../actions';

import { initStateType, CategoriesActionsType } from './types'

const INIT_STATE: initStateType = {
  manufacture: {},
  loading: false,
  error: null,
  lazyLoading: false,
  deleteLoading: false,
  postLoading: false,
  putLoading: false, 
};

const reducer = (state = INIT_STATE, action: CategoriesActionsType): initStateType => {
  switch (action.type) {

    case MANUFACTURERS_SEARCH_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case MANUFACTURERS_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case MANUFACTURERS_SEARCH_SUCCESS:
      return {
        ...state,
        manufacture: action.payload,
        loading: false,
        error: null,
      };

    case MANUFACTURERS_GET_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case MANUFACTURERS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case MANUFACTURERS_GET_SUCCESS:
      return {
        ...state,
        manufacture: action.payload,
        loading: false,
        error: null,
      };

    case MANUFACTUR_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
        error: null,
      };

    case MANUFACTUR_PUT_SUCCESS:
      state.manufacture[action.payload.id] = action.payload;
      return {
        ...state, 
        putLoading: false,
        error: null,
      };
    case MANUFACTUR_PUT_ERROR:
      return {
        ...state,
        putLoading: false, 
        error: action.payload,
      };

    case MANUFACTUR_POST_ERROR:
      return {
        ...state,
        postLoading: false, 
        error: action.payload,
      };

    case MANUFACTUR_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
        error: null,
      };

    case MANUFACTUR_POST_SUCCESS:
      state.manufacture[action.payload.id] = action.payload;
      return {
        ...state, 
        postLoading: false,
        error: null,
      };
    case MANUFACTUR_DELETE_ERROR:
      return {
        ...state,
        deleteLoading: false, 
        error: action.payload,
      };

    case MANUFACTUR_DELETE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        error: null,
      };

    case MANUFACTUR_DELETE_SUCCESS:
      delete(state.manufacture[action.payload]);
      return {
        ...state, 
        deleteLoading: false,
        error: null,
      };

    case MANUFACTURERS_LAZY_SUCCESS: 
      return {
        ...state,
        manufacture: {...state.manufacture, ...action.payload},
        lazyLoading: false,
        error: null,
      };
      case MANUFACTURERS_LAZY_REQUEST: 
    return {
      ...state, 
      lazyLoading: true,
      error: null,
    };
    
    default:
      return state;
  }
};

export default reducer;