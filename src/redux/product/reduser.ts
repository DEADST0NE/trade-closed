import {
  PRODUCTS_GET_REQUEST, 
  PRODUCTS_GET_SUCCESS,
  PRODUCTS_GET_ERROR,
  PRODUCTS_LAZY_SUCCESS,
  PRODUCTS_LAZY_REQUEST,
  PRODUCTS_PUT_REQUEST,
  PRODUCTS_PUT_SUCCESS,
  PRODUCTS_PUT_ERROR,
  PRODUCTS_POST_REQUEST,
  PRODUCTS_POST_SUCCESS,
  PRODUCTS_POST_ERROR,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_DELETE_ERROR,
  PRODUCTS_SEARCH_REQUEST,
  PRODUCTS_SEARCH_SUCCESS,
  PRODUCTS_SEARCH_ERROR,
  PRODUCTS_MANUFACTURE_FILTER,
} from '../actions';

import { initStateType, ProductActionsType } from './types'

const INIT_STATE: initStateType = {
  products: {},
  productsLazyLoading: false,
  loading: false,
  error: null,
  putLoading: false,
  postLoading: false,
  deleteLoading: false,
  filterManufacture: [],
};

const addFilter = (array: string[], id: string) => { 
  if(array.length) {
    const index = array.findIndex(item => item === id); 
    index >= 0 ? array.splice(index) : array.push(id);
  }else array.push(id);
}

const reducer = (state = INIT_STATE, action: ProductActionsType): initStateType => {
  switch (action.type) {
    case PRODUCTS_GET_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case PRODUCTS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PRODUCTS_GET_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    case PRODUCTS_LAZY_SUCCESS:
      return {
        ...state,
        productsLazyLoading: false,
        products: {...state.products, ...action.payload}
      }
    case PRODUCTS_LAZY_REQUEST:
      return {
        ...state,
        productsLazyLoading: true,
      };
    case PRODUCTS_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
      };
    case PRODUCTS_PUT_SUCCESS:
      state.products[action.payload.id] = action.payload; 
      return {
        ...state,
        putLoading: false,
      };
    case PRODUCTS_PUT_ERROR:
      return {
        ...state,
        putLoading: false,
      };
    case PRODUCTS_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };
    case PRODUCTS_POST_SUCCESS:
      state.products[action.payload.id] = action.payload; 
      return {
        ...state,
        postLoading: false,
      };
    case PRODUCTS_POST_ERROR:
      return {
        ...state,
        postLoading: false,
      };
    case PRODUCTS_DELETE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case PRODUCTS_DELETE_SUCCESS:
      delete(state.products[action.payload]);
      return {
        ...state,
        deleteLoading: false,
      };
    case PRODUCTS_DELETE_ERROR:
      return {
        ...state,
        deleteLoading: false,
      };
    case PRODUCTS_SEARCH_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case PRODUCTS_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PRODUCTS_SEARCH_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    case PRODUCTS_MANUFACTURE_FILTER:
      addFilter(state.filterManufacture, action.payload);
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer; 