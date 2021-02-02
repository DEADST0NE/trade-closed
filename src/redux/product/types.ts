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
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_DELETE_ERROR,
  PRODUCTS_SEARCH_REQUEST,
  PRODUCTS_SEARCH_SUCCESS,
  PRODUCTS_SEARCH_ERROR,
  PRODUCTS_MANUFACTURE_FILTER,
  PRODUCTS_CLIENT_CATEGORY_CLIENT_FILTER,
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
  code: string;
  manufacturer: {
    id: string,
    name: string,
  }
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
    code: string;
    manufacturer: {
      id: string,
      name: string,
    }
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
  deleteLoading: boolean;
  error: errorType | null;
  filterManufacture: string[];
  filterClientCategory: string[];
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
interface productDeleteRequestType {
  type: typeof PRODUCTS_DELETE_REQUEST;
}
interface productDeleteSuccessType {
  type: typeof PRODUCTS_DELETE_SUCCESS;
  payload: string;
}
interface productDeleteErrorType {
  type: typeof PRODUCTS_DELETE_ERROR;
}
interface productSearchErrorType {
  type: typeof PRODUCTS_SEARCH_ERROR;
  payload: errorType
}
interface productSearchSuccessType {
  type: typeof PRODUCTS_SEARCH_SUCCESS;
  payload: productsTypeObject;
}
interface productSearchRequestType {
  type: typeof PRODUCTS_SEARCH_REQUEST;
}
interface productManufactureFilterType {
  type: typeof PRODUCTS_MANUFACTURE_FILTER;
  payload: string;
}
interface productClientCategoryFilterType {
  type: typeof PRODUCTS_CLIENT_CATEGORY_CLIENT_FILTER;
  payload: string;
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
  | productPostErrorType
  | productDeleteRequestType
  | productDeleteSuccessType
  | productDeleteErrorType
  | productSearchErrorType
  | productSearchSuccessType
  | productSearchRequestType
  | productManufactureFilterType
  | productClientCategoryFilterType;