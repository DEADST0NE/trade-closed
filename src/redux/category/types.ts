import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_ERROR,
  CATEGORY_POST_REQUEST,
  CATEGORY_POST_SUCCESS,
  CATEGORY_POST_ERROR,
  CATEGORY_PUT_REQUEST,
  CATEGORY_PUT_SUCCESS,
  CATEGORY_PUT_ERROR,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_ERROR,
} from '../actions';

export interface errorType {
  message: string,
}

export interface categoryType {
  value: string;
  label: string;
  count: number;
}

export type initStateType = {
  category: categoryType[] | null;
  loading: boolean;
  error: errorType | null;
  postLoading: boolean;
  putLoading: boolean;
  deleteLoading: boolean;
} 

interface categoriesGetErrorType {
  type: typeof CATEGORIES_GET_ERROR;
  payload: errorType
}
interface categoriesGetSuccessType {
  type: typeof CATEGORIES_GET_SUCCESS;
  payload: any
}
interface categoriesGetRequestType {
  type: typeof CATEGORIES_GET_REQUEST;
}

interface categoryPostErrorType {
  type: typeof CATEGORY_POST_ERROR;
  payload: errorType
}
interface categoryPostSuccessType {
  type: typeof CATEGORY_POST_SUCCESS;
  payload: categoryType
}
interface categoryPostRequestType {
  type: typeof CATEGORY_POST_REQUEST;
}

interface categoryPutErrorType {
  type: typeof CATEGORY_PUT_ERROR;
  payload: errorType
}
interface categoryPutSuccessType {
  type: typeof CATEGORY_PUT_SUCCESS;
  payload: categoryType
}
interface categoryPutRequestType {
  type: typeof CATEGORY_PUT_REQUEST;
}

interface categoryDeleteErrorType {
  type: typeof CATEGORY_DELETE_ERROR;
  payload: errorType
}
interface categoryDeleteSuccessType {
  type: typeof CATEGORY_DELETE_SUCCESS;
  payload: categoryType
}
interface categoryDeleteRequestType {
  type: typeof CATEGORY_DELETE_REQUEST;
}

export type CategoriesActionsType =
  | categoriesGetErrorType
  | categoriesGetSuccessType
  | categoriesGetRequestType
  | categoryPostErrorType
  | categoryPostSuccessType
  | categoryPostRequestType
  | categoryPutErrorType
  | categoryPutSuccessType
  | categoryPutRequestType
  | categoryDeleteErrorType
  | categoryDeleteSuccessType
  | categoryDeleteRequestType;