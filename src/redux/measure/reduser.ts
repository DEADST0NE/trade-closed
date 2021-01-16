import {
  MEASURE_GET_REQUEST, 
  MEASURE_GET_SUCCESS,
  MEASURE_GET_ERROR,
} from '../actions';

import { initStateType, MeasuresActionsType } from './types'

const INIT_STATE: initStateType = {
  measures: [],
  loading: false,
  error: null,
};

const reducer = (state = INIT_STATE, action: MeasuresActionsType): initStateType => {
  switch (action.type) { 
    case MEASURE_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case MEASURE_GET_SUCCESS:
      return {
        ...state,
        measures: action.payload,
        loading: false,
        error: null,
      };

    case MEASURE_GET_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default reducer;