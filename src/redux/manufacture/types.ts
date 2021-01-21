import {
  MANUFACTURERS_GET_REQUEST,
  MANUFACTURERS_GET_SUCCESS,
  MANUFACTURERS_GET_ERROR,
  MANUFACTUR_POST_REQUEST,
  MANUFACTUR_POST_SUCCESS,
  MANUFACTUR_POST_ERROR,
  MANUFACTUR_PUT_REQUEST,
  MANUFACTUR_PUT_SUCCESS,
  MANUFACTUR_PUT_ERROR,
  MANUFACTUR_DELETE_REQUEST,
  MANUFACTUR_DELETE_SUCCESS,
  MANUFACTUR_DELETE_ERROR,
  MANUFACTURERS_LAZY_SUCCESS,
  MANUFACTURERS_LAZY_REQUEST,
  MANUFACTURERS_SEARCH_REQUEST,
  MANUFACTURERS_SEARCH_SUCCESS,
  MANUFACTURERS_SEARCH_ERROR,
} from '../actions';

export interface errorType {
  message: string,
}

export interface manufactureType {
  id: string,
  name: string, 
  address: string,
  email: string,
  phone: string,
  productNumber: number
}

export type initStateType = {
  manufacture: {[id: string]: manufactureType};
  loading: boolean;
  error: errorType | null;
  postLoading: boolean;
  putLoading: boolean;
  deleteLoading: boolean;
  lazyLoading: boolean;
} 

interface manufacturersGetErrorType {
  type: typeof MANUFACTURERS_GET_ERROR;
  payload: errorType
}
interface manufacturersGetSuccessType {
  type: typeof MANUFACTURERS_GET_SUCCESS;
  payload: {[id: string]: manufactureType}
}
interface manufacturersGetRequestType {
  type: typeof MANUFACTURERS_GET_REQUEST;
}

interface manufacturePostErrorType {
  type: typeof MANUFACTUR_POST_ERROR;
  payload: errorType
}
interface manufacturePostSuccessType {
  type: typeof MANUFACTUR_POST_SUCCESS;
  payload: manufactureType
}
interface manufacturePostRequestType {
  type: typeof MANUFACTUR_POST_REQUEST;
}

interface manufacturePutErrorType {
  type: typeof MANUFACTUR_PUT_ERROR;
  payload: errorType
}
interface manufacturePutSuccessType {
  type: typeof MANUFACTUR_PUT_SUCCESS;
  payload: manufactureType
}
interface manufacturePutRequestType {
  type: typeof MANUFACTUR_PUT_REQUEST;
}

interface manufactureDeleteErrorType {
  type: typeof MANUFACTUR_DELETE_ERROR;
  payload: errorType
}
interface manufactureDeleteSuccessType {
  type: typeof MANUFACTUR_DELETE_SUCCESS;
  payload: string
}
interface manufactureDeleteRequestType {
  type: typeof MANUFACTUR_DELETE_REQUEST;
}
interface manufactureLazySuccessType {
  type: typeof MANUFACTURERS_LAZY_SUCCESS;
  payload: {[id: string]: manufactureType}
}
interface manufactureLazyRequestType {
  type: typeof MANUFACTURERS_LAZY_REQUEST;
}
interface manufactureSearchSuccessType {
  type: typeof MANUFACTURERS_SEARCH_SUCCESS;
  payload: {[id: string]: manufactureType}
}
interface manufactureSearchRequestType {
  type: typeof MANUFACTURERS_SEARCH_REQUEST;
}
interface manufactureSearchErrorType {
  type: typeof MANUFACTURERS_SEARCH_ERROR;
  payload: errorType
}


export type CategoriesActionsType =
  | manufacturersGetErrorType
  | manufacturersGetSuccessType
  | manufacturersGetRequestType
  | manufacturePostErrorType
  | manufacturePostSuccessType
  | manufacturePostRequestType
  | manufacturePutErrorType
  | manufacturePutSuccessType
  | manufacturePutRequestType
  | manufactureDeleteErrorType
  | manufactureDeleteSuccessType
  | manufactureDeleteRequestType
  | manufactureLazySuccessType
  | manufactureLazyRequestType
  | manufactureSearchSuccessType
  | manufactureSearchRequestType
  | manufactureSearchErrorType;