import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
  BASKET_PAYMENT_ADD,
  BASKET_PAYMENT_DELETE,
  BASKET_PAYMENT_DELETE_ALL
} from '../actions';

import { initStateType, BasketActionsType } from './types'

const ditailPayProcent = (objectArray: initStateType["basket"], pay: number[]) => { 
  const sumBasket = Object.keys(objectArray).reduce( (sum: number, item: string) => (
    sum = sum + (objectArray[item].count * Number(objectArray[item].product.price?.count))
  ), 0);
  const sumPay = pay.reduce((sum, item) => ( sum = sum + item ), 0)
  const oneProcentProduct = sumBasket / 100;
  const onePayProduct = sumPay / 100;
  Object.keys(objectArray).forEach( (item: string) => {
    objectArray[item].ditailPayProcent = ((objectArray[item].count * Number(objectArray[item].product.price?.count)) / oneProcentProduct) * onePayProduct;
  })
}

const INIT_STATE: initStateType = {
  basket: {},
  payments: [],
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
    //----------------------------

    //Добавление оплаты к корзине
      case BASKET_PAYMENT_ADD:
        state.payments.push(action.payload);
        ditailPayProcent(state.basket, state.payments)
        return {
          ...state
        }
      case BASKET_PAYMENT_DELETE:
        state.payments.splice(action.payload, 1); 
        return {
          ...state
        }
      case BASKET_PAYMENT_DELETE_ALL: 
        state.payments = [];
        return {
          ...state
        }
    //----------------------------
    default:
      return state;
  }
};

export default reducer;