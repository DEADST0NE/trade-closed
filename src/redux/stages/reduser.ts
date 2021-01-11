import {
  STAGES_GET_REQUEST, 
  STAGES_GET_SUCCESS,
  STAGES_GET_ERROR,
} from '../actions';

import { initStateType, StagesActionsType } from './types'

const INIT_STATE: initStateType = {
  dictionary: [],
  dictionaryLoading: false,
  dictionaryError: null,
};

const reducer = (state = INIT_STATE, action: StagesActionsType): initStateType => {
  switch (action.type) {
    case STAGES_GET_ERROR:
      return {
        ...state,
        dictionaryLoading: false, 
        dictionaryError: action.payload,
      };

    case STAGES_GET_REQUEST:
      return {
        ...state,
        dictionaryLoading: true,
        dictionaryError: null,
      };

    case STAGES_GET_SUCCESS:
      return {
        ...state,
        dictionary: action.payload,
        dictionaryError: null,
      };
    
    default:
      return state;
  }
};

export default reducer;