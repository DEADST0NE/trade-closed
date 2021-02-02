import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
  BASKET_PAYMENT_ADD,
  BASKET_PAYMENT_DELETE,
  BASKET_PAYMENT_DELETE_ALL
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

export const addBasketPayment = (count: number) => ({
  type: BASKET_PAYMENT_ADD,
  payload: count,
});

export const deleteBasketPayment = (id: number) => ({
  type: BASKET_PAYMENT_DELETE,
  payload: id,
});

export const deleteBasketPaymentAll = () => ({
  type: BASKET_PAYMENT_DELETE_ALL,
});

