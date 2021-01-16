import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_ERROR,
} from '../actions';

import { initStateType, CategoriesActionsType } from './types'

const INIT_STATE: initStateType = {
  category: null,
  loading: false,
  error: null,
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
    
    default:
      return state;
  }
};

export default reducer;