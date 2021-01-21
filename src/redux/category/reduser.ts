import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_ERROR,
  CATEGORY_POST_REQUEST,
  CATEGORY_POST_SUCCESS,
  CATEGORY_POST_ERROR,
  CATEGORY_PUT_REQUEST,
  CATEGORY_PUT_SUCCESS,
  CATEGORY_PUT_ERROR,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_ERROR,
} from '../actions';

import { initStateType, CategoriesActionsType } from './types'

const INIT_STATE: initStateType = {
  category: null,
  loading: false,
  error: null,
  deleteLoading: false,
  postLoading: false,
  putLoading: false
};

const reducer = (state = INIT_STATE, action: CategoriesActionsType): initStateType => {
  switch (action.type) {
    case CATEGORIES_GET_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CATEGORIES_GET_SUCCESS:
      return {
        ...state,
        category: action.payload,
        loading: false,
        error: null,
      };

    case CATEGORY_PUT_REQUEST:
      return {
        ...state,
        putLoading: true,
        error: null,
      };

    case CATEGORY_PUT_SUCCESS:
      return {
        ...state, 
        putLoading: false,
        error: null,
      };
    case CATEGORY_PUT_ERROR:
      return {
        ...state,
        putLoading: false, 
        error: action.payload,
      };

    case CATEGORY_POST_ERROR:
      return {
        ...state,
        postLoading: false, 
        error: action.payload,
      };

    case CATEGORY_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
        error: null,
      };

    case CATEGORY_POST_SUCCESS:
      return {
        ...state, 
        postLoading: false,
        error: null,
      };
    case CATEGORY_DELETE_ERROR:
      return {
        ...state,
        deleteLoading: false, 
        error: action.payload,
      };

    case CATEGORY_DELETE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        error: null,
      };

    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state, 
        deleteLoading: false,
        error: null,
      };
    
    default:
      return state;
  }
};

export default reducer;