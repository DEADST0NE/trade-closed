import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
  BASKET_PAYMENT_CHANGE,
  BASKET_ITEM_DELETE
} from '../actions';

import { initStateType, BasketActionsType } from './types'

const ditailPayProcent = (objectArray: initStateType["basket"], pay: number) => { 
  const sumBasket = Object.keys(objectArray).reduce( (sum: number, item: string) => (
    sum = sum + (objectArray[item].count * Number(objectArray[item].product.price?.count))
  ), 0); 
  const oneProcentProduct = sumBasket / 100;
  const oneProcentPay = pay / 100;
  Object.keys(objectArray).forEach( (item: string) => {
    const count = Math.round(((objectArray[item].count * Number(objectArray[item].product.price?.count)) / oneProcentProduct) * oneProcentPay);
    objectArray[item].ditailPayProcent = Math.round( count / ((objectArray[item].count * Number(objectArray[item].product.price?.count)) / 100));
    objectArray[item].ditailPayCount = count;
  })
}

const INIT_STATE: initStateType = {
  basket: {},
  payments: 0,
};

const reducer = (state = INIT_STATE, action: BasketActionsType): initStateType => {
  switch (action.type) {
    // Добавление товара в корзину
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
        
      case BASKET_ITEM_DELETE:
        delete(state.basket[action.payload])
        return {
          ...state,
        };
    //----------------------------

    //Добавление оплаты к корзине
      case BASKET_PAYMENT_CHANGE:
        state.payments = action.payload;
        if(state.basket)
          ditailPayProcent(state.basket, state.payments)
        return {
          ...state
        } 
    //----------------------------
    default:
      return state;
  }
};

export default reducer;