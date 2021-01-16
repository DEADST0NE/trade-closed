import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_ERROR,
} from '../actions';

export interface errorType {
  message: string,
}

export interface categoryType {
  value: number;
  label: string;
  count: number;
}

export type initStateType = {
  category: categoryType[] | null;
  loading: boolean;
  error: errorType | null;
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

export type CategoriesActionsType =
  | categoriesGetErrorType
  | categoriesGetSuccessType
  | categoriesGetRequestType;