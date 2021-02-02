import {
  BASKET_ADD,
  BASKET_DELETE,
  BASKET_CLEAR,
  BASKET_PAYMENT_ADD,
  BASKET_PAYMENT_DELETE,
  BASKET_PAYMENT_DELETE_ALL
} from '../actions'

export interface initStateType {
  basket: basketItemTypeObject
  payments: number[]
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
//--------------------------

// Добавление оплаты к корзине
  interface addPaymentBasket {
    type: typeof BASKET_PAYMENT_ADD;
    payload: number
  }
  interface deletePaymentBasket {
    type: typeof BASKET_PAYMENT_DELETE;
    payload: number
  }
  interface basketPaymentDeleteAll {
    type: typeof BASKET_PAYMENT_DELETE_ALL;
  }
// ---------------------------

export type BasketActionsType =
  | deleteBasketType 
  | addBasket
  | clearBasket
  | addPaymentBasket
  | deletePaymentBasket
  | basketPaymentDeleteAll;

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
    count: number
  }
}