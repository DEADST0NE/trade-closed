import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
  BASKET_PAYMENT_CHANGE,
  BASKET_ITEM_DELETE
} from '../actions'

import { productType } from './types'

export const addBasketProduct = (product: productType) => ({
  type: BASKET_ADD,
  payload: product,
});

export const deleteBasketProduct = (id: string) => ({
  type: BASKET_DELETE,
  payload: id,
});

export const clearBasketProduct = () => ({
  type: BASKET_CLEAR
});

export const deleteItemBasketProduct = (id: string) => ({
  type: BASKET_ITEM_DELETE,
  payload: id,
});

export const changeBasketPayment = (count: number) => ({
  type: BASKET_PAYMENT_CHANGE,
  payload: count,
});

