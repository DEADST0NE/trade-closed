import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
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
