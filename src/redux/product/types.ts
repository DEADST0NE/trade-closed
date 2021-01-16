import {
  PRODUCTS_GET_REQUEST,
  PRODUCTS_GET_SUCCESS,
  PRODUCTS_GET_ERROR,
  PRODUCTS_LAZY_SUCCESS,
  PRODUCTS_LAZY_REQUEST,
  PRODUCTS_PUT_REQUEST,
  PRODUCTS_PUT_SUCCESS,
  PRODUCTS_PUT_ERROR,
  PRODUCTS_POST_REQUEST,
  PRODUCTS_POST_SUCCESS,
  PRODUCTS_POST_ERROR,
} from '../actions';

export interface errorType {
  message: string,
}

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
  }[] 
}

export interface productsTypeObject { 
  [id: string]: {
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
    }[]
  }
}

export type initStateType = {
  products: productsTypeObject;
  loading: boolean;
  productsLazyLoading: boolean;
  putLoading: boolean;
  postLoading: boolean;
  error: errorType | null;
} 

interface productGetErrorType {
  type: typeof PRODUCTS_GET_ERROR;
  payload: errorType
}
interface productGetSuccessType {
  type: typeof PRODUCTS_GET_SUCCESS;
  payload: productsTypeObject;
}
interface productGetRequestType {
  type: typeof PRODUCTS_GET_REQUEST;
}
interface productLazySuccessType {
  type: typeof PRODUCTS_LAZY_SUCCESS;
  payload: productsTypeObject;
}
interface productLazyRequestType {
  type: typeof PRODUCTS_LAZY_REQUEST;
}
interface productPutRequestType {
  type: typeof PRODUCTS_PUT_REQUEST;
}
interface productPutSuccessType {
  type: typeof PRODUCTS_PUT_SUCCESS;
  payload: productType;
}
interface productPutErrorType {
  type: typeof PRODUCTS_PUT_ERROR;
}
interface productPostRequestType {
  type: typeof PRODUCTS_POST_REQUEST;
}
interface productPostSuccessType {
  type: typeof PRODUCTS_POST_SUCCESS;
  payload: productType;
}
interface productPostErrorType {
  type: typeof PRODUCTS_POST_ERROR;
}

export type ProductActionsType =
  | productGetErrorType
  | productGetSuccessType
  | productGetRequestType
  | productLazySuccessType
  | productLazyRequestType
  | productPutRequestType
  | productPutSuccessType
  | productPutErrorType
  | productPostRequestType
  | productPostSuccessType
  | productPostErrorType;