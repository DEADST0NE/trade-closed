import {
  COMPANY_GET_REQUEST, 
  COMPANY_GET_SUCCESS,
  COMPANY_GET_ERROR,
} from '../actions';

import { initStateType, CompanyActionsType } from './types'

const INIT_STATE: initStateType = {
  company: null,
  loading: false,
  error: null,
};

const reducer = (state = INIT_STATE, action: CompanyActionsType): initStateType => {
  switch (action.type) {
    case COMPANY_GET_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case COMPANY_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case COMPANY_GET_SUCCESS:
      return {
        ...state,
        company: action.payload,
        loading: false,
        error: null,
      };
    
    default:
      return state;
  }
};

export default reducer;