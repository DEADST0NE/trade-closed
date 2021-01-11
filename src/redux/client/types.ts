import {
  CLIENTS_GET_REQUEST,
  CLIENTS_GET_SUCCESS,
  CLIENTS_GET_ERROR,
  CLIENTS_POST_SUCCESS,
  CLIENTS_POST_REQUEST,
  CLIENTS_POST_ERROR,
  CLIENTS_DELETE_SUCCESS,
  CLIENTS_DELETE_REQUEST,
  CLIENTS_DELETE_ERROR,
  CLIENTS_SEARCH_GET_SUCCESS,
  CLIENTS_SEARCH_GET_REQUEST,
  CLIENTS_SEARCH_GET_ERROR,
  CLIENTS_CATEGORY_GET_REQUEST,
  CLIENTS_CATEGORY_GET_SUCCESS,
  CLIENTS_CATEGORY_GET_ERROR,
  CLIENTS_CATEGORY_POST_SUCCESS,
  CLIENTS_CATEGORY_DELETE_SUCCESS,
  CLIENTS_CATEGORY_PUT_SUCCESS
} from '../actions';

export interface errorType {
  message: string,
}

export interface clientsType {
  key: string,
  id: string,
  name: string,
  address: string,
  email: string,
  phone: string,
  dateAdd: string,
  clientsCategory: {
    value: string,
    label: string
  },
  debt: {
    count: number,
    detailing: {
      number: string,
      total: number
    }
  }
  applicationStatistic: {
    count: number,
    stages: {
      [id: number]: number
    }, 
  }
}

export interface categoryClientType {
  value: string,
  label: string,
}

export type initStateType = {
  clients: clientsType[];
  loading: boolean;
  error: errorType | null;
  categoryClient: categoryClientType[];
  categoryClientLoading: boolean;
  categoryClientError: errorType | null;
  searchClient: clientsType[],
  searchClientLoadung: boolean
} 

// Список клиентов компании
  interface clientGetErrorType {
    type: typeof CLIENTS_GET_ERROR;
    payload: errorType
  }
  interface clientGetSuccessType {
    type: typeof CLIENTS_GET_SUCCESS;
    payload: clientsType[]
  }
  interface clientGetRequestType {
    type: typeof CLIENTS_GET_REQUEST;
  }
// ------------------------

// Добавление клиента к компании
  interface clientPostErrorType {
    type: typeof CLIENTS_POST_ERROR;
    payload: errorType
  }
  interface clientPostSuccessType {
    type: typeof CLIENTS_POST_SUCCESS;
    payload: clientsType
  }
  interface clientPostRequestType {
    type: typeof CLIENTS_POST_REQUEST;
  }
// ------------------------

// Удаления клиента из компании
interface clientDeleteErrorType {
  type: typeof CLIENTS_DELETE_ERROR;
  payload: errorType
}
interface clientDeleteSuccessType {
  type: typeof CLIENTS_DELETE_SUCCESS;
  payload: clientsType[]
}
interface clientDeleteRequestType {
  type: typeof CLIENTS_DELETE_REQUEST;
}
// ------------------------

// Поиск клиента
  interface clientSearchGetSuccessType {
    type: typeof CLIENTS_SEARCH_GET_SUCCESS,
    payload: clientsType[]
  }
  interface clientSearchGetRequestType {
    type: typeof CLIENTS_SEARCH_GET_REQUEST
  }
  interface clientSearchGetErrorType {
    type: typeof CLIENTS_SEARCH_GET_ERROR
  }
// -------------

// Список категорий клиентов компании 
  interface clientCategoryGetErrorType {
    type: typeof CLIENTS_CATEGORY_GET_ERROR;
    payload: errorType
  }
  interface clientCategoryGetSuccessType {
    type: typeof CLIENTS_CATEGORY_GET_SUCCESS;
    payload: categoryClientType[]
  }
  interface clientCategoryGetRequestType {
    type: typeof CLIENTS_CATEGORY_GET_REQUEST;
  }
// ---------------------------

// Добавление категорий клиента
  interface clientCategoryPostSuccessType {
    type: typeof CLIENTS_CATEGORY_POST_SUCCESS,
    payload: categoryClientType
  }
// ----------------------------

// Удаление категорий клиента
  interface clientCategoryDeleteSuccessType {
    type: typeof CLIENTS_CATEGORY_DELETE_SUCCESS,
    payload: categoryClientType[]
  }
// ----------------------------

// Изменения категории клиента
  interface clientCategoryPutSuccessType {
    type: typeof CLIENTS_CATEGORY_PUT_SUCCESS,
    payload: clientsType
  }
// 

export type StagesActionsType =
  | clientGetErrorType
  | clientGetSuccessType
  | clientGetRequestType
  | clientPostErrorType
  | clientPostSuccessType
  | clientPostRequestType
  | clientDeleteErrorType
  | clientDeleteSuccessType
  | clientDeleteRequestType
  | clientCategoryGetErrorType
  | clientCategoryGetSuccessType
  | clientCategoryGetRequestType
  | clientCategoryPostSuccessType
  | clientCategoryDeleteSuccessType
  | clientCategoryPutSuccessType
  | clientSearchGetSuccessType
  | clientSearchGetRequestType
  | clientSearchGetErrorType;