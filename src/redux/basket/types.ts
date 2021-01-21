import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
} from '../actions'

export interface initStateType {
  basket: basketItemTypeObject
}

interface deleteBasketType {
  type: typeof BASKET_DELETE;
  payload: string
}

interface addBasket {
  type: typeof BASKET_ADD,
  payload: productType
}

interface clearBasket {
  type: typeof BASKET_CLEAR,
}

export type BasketActionsType =
  | deleteBasketType 
  | addBasket
  | clearBasket

export interface productType {
  id: string;
  name: string;
  weight: number | null;
  avatarProduct: any;
  categoryId: string;
  description: string | null;
  measure: {
    value: string;
    label: string;
  },
  price: { 
    id: string;
    count: number; 
    category: {
      value: string;
      label: string;
    }
  } | undefined
}

export interface basketItemTypeObject { 
  [id: string]: {
    product: {
      id: string;
      name: string;
      weight: number | null;
      categoryId: string;
      avatarProduct: any;
      description: string | null;
      measure: {
        value: string;
        label: string;
      },
      price: { 
        id: string;
        count: number; 
        category: {
          value: string;
          label: string;
        }
      } | undefined
    },
    count: number
  }
}