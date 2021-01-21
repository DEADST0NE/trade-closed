import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
} from '../actions';

import { initStateType, BasketActionsType } from './types'

const INIT_STATE: initStateType = {
  basket: {},
};

const reducer = (state = INIT_STATE, action: BasketActionsType): initStateType => {
  switch (action.type) {
    case BASKET_ADD:
      if(!state.basket[action.payload.id]) {
        state.basket[action.payload.id] = {
          product: action.payload,
          count: 1
        }
      }
      else {
        state.basket[action.payload.id] = {
          ...state.basket[action.payload.id],
          count: state.basket[action.payload.id].count + 1
        }
      }
      return {
        ...state,
      };

    case BASKET_DELETE:
      if(state.basket[action.payload].count > 1) {
        state.basket[action.payload].count -=1
      }else {
        delete(state.basket[action.payload])
      }
      return {
        ...state,
      };

    case BASKET_CLEAR:
      state.basket = {}
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;