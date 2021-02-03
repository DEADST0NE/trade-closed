import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
  BASKET_PAYMENT_CHANGE,
  BASKET_ITEM_DELETE
} from '../actions'

export interface initStateType {
  basket: basketItemTypeObject
  payments: number
} 
// Добавление товара в корзину
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

  interface deleteItemBasket {
    type: typeof BASKET_ITEM_DELETE,
    payload: string
  }
//--------------------------

// Добавление оплаты к корзине
  interface changePaymentBasket {
    type: typeof BASKET_PAYMENT_CHANGE;
    payload: number
  }
// ---------------------------

export type BasketActionsType =
  | deleteBasketType 
  | addBasket
  | clearBasket
  | changePaymentBasket
  | deleteItemBasket;

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
    ditailPayProcent?: number;
    ditailPayCount?: number;
    count: number
  }
}