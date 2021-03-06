import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import store from './reducers';

export type thunkType = ThunkAction<
  void,
  typeof store,
  unknown,
  Action<string>
>;

// Авторизация
export const SET_USER_DATA = 'SET_USER_DATA'
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'
export const LOGOUT_USER = 'LOGOUT_USER'

// Список заявок
export const APPLICATIONS_GET_REQUEST = 'APPLICATIONS_GET_REQUEST'
export const APPLICATIONS_GET_SUCCESS = 'APPLICATIONS_GET_SUCCESS'
export const APPLICATIONS_GET_ERROR = 'APPLICATIONS_GET_ERROR'
export const APPLICATION_POST_REQUEST = 'APPLICATION_POST_REQUEST'
export const APPLICATION_POST_SUCCESS = 'APPLICATION_POST_SUCCESS'
export const APPLICATION_POST_ERROR = 'APPLICATION_POST_ERROR'

// Детали заявки
export const DETAIL_APPLICATIONS_SET = 'DETAIL_APPLICATIONS_SET'
export const DETAIL_PRODUCTS_GET_REQUEST = 'DETAIL_PRODUCTS_GET_REQUEST'
export const DETAIL_PRODUCTS_GET_SUCCESS = 'DETAIL_PRODUCTS_GET_SUCCESS'
export const DETAIL_PRODUCTS_GET_ERROR = 'DETAIL_PRODUCTS_GET_ERROR' 
export const DETAIL_PAYMENTS_GET_REQUEST = 'DETAIL_PAYMENTS_GET_REQUEST'
export const DETAIL_PAYMENTS_GET_SUCCESS = 'DETAIL_PAYMENTS_GET_SUCCESS'
export const DETAIL_PAYMENTS_GET_ERROR = 'DETAIL_PAYMENTS_GET_ERROR'
export const DETAIL_PAYMENT_POST_REQUEST = 'DETAIL_PAYMENT_POST_REQUEST'
export const DETAIL_PAYMENT_POST_SUCCESS = 'DETAIL_PAYMENT_POST_SUCCESS'
export const DETAIL_PAYMENT_POST_ERROR = 'DETAIL_PAYMENT_POST_ERROR'
export const DETAIL_PAYMENT_PUT_REQUEST = 'DETAIL_PAYMENT_PUT_REQUEST'
export const DETAIL_PAYMENT_PUT_SUCCESS = 'DETAIL_PAYMENT_PUT_SUCCESS'
export const DETAIL_PAYMENT_PUT_ERROR = 'DETAIL_PAYMENT_PUT_ERROR'

// Этапы 
export const STAGES_GET_REQUEST = 'STAGES_GET_REQUEST'
export const STAGES_GET_SUCCESS = 'STAGES_GET_SUCCESS'
export const STAGES_GET_ERROR = 'STAGES_GET_ERROR'
export const STAGE_POST_REQUEST = 'STAGE_POST_REQUEST'
export const STAGE_POST_SUCCESS = 'STAGE_POST_SUCCESS'
export const STAGE_POST_ERROR = 'STAGE_POST_ERROR'

// Клиенты 
export const CLIENTS_SEARCH_GET_SUCCESS = 'CLIENTS_SEARCH_GET_SUCCESS'
export const CLIENTS_SEARCH_GET_REQUEST = 'CLIENTS_SEARCH_GET_REQUEST'
export const CLIENTS_SEARCH_GET_ERROR = 'CLIENTS_SEARCH_GET_ERROR' 
export const CLIENTS_GET_REQUEST = 'CLIENT_GET_REQUEST'
export const CLIENTS_GET_SUCCESS = 'CLIENT_GET_SUCCESS'
export const CLIENTS_GET_ERROR = 'CLIENT_GET_ERROR'
export const CLIENTS_POST_SUCCESS = 'CLIENTS_POST_SUCCESS'
export const CLIENTS_POST_REQUEST = 'CLIENTS_POST_REQUEST'
export const CLIENTS_POST_ERROR = 'CLIENTS_POST_ERROR'
export const CLIENTS_DELETE_SUCCESS = 'CLIENTS_DELETE_SUCCESS'
export const CLIENTS_DELETE_REQUEST = 'CLIENTS_DELETE_REQUEST'
export const CLIENTS_DELETE_ERROR = 'CLIENTS_DELETE_ERROR'
export const CLIENTS_CATEGORY_GET_REQUEST = 'CLIENTS_CATEGORY_GET_REQUEST'
export const CLIENTS_CATEGORY_GET_SUCCESS = 'CLIENTS_CATEGORY_GET_SUCCESS'
export const CLIENTS_CATEGORY_GET_ERROR = 'CLIENTS_CATEGORY_GET_ERROR' 
export const CLIENTS_CATEGORY_POST_SUCCESS = 'CLIENTS_CATEGORY_POST_SUCCESS'
export const CLIENTS_CATEGORY_DELETE_SUCCESS = 'CLIENTS_CATEGORY_DELETE_SUCCESS'
export const CLIENTS_CATEGORY_PUT_SUCCESS = 'CLIENTS_CATEGORY_PUT_SUCCESS'


// Компания 
export const COMPANY_GET_REQUEST = 'COMPANY_GET_REQUEST'
export const COMPANY_GET_SUCCESS = 'COMPANY_GET_SUCCESS'
export const COMPANY_GET_ERROR = 'COMPANY_GET_ERROR'

// Товары 
export const PRODUCTS_GET_REQUEST = 'PRODUCTS_GET_REQUEST'
export const PRODUCTS_GET_SUCCESS = 'PRODUCTS_GET_SUCCESS'
export const PRODUCTS_GET_ERROR = 'PRODUCTS_GET_ERROR'
export const PRODUCTS_LAZY_SUCCESS = 'PRODUCTS_LAZY_SUCCESS'
export const PRODUCTS_LAZY_REQUEST = 'PRODUCTS_LAZY_REQUEST'
export const PRODUCTS_PUT_REQUEST = 'PRODUCTS_PUT_REQUEST'
export const PRODUCTS_PUT_SUCCESS = 'PRODUCTS_PUT_SUCCESS'
export const PRODUCTS_PUT_ERROR = 'PRODUCTS_PUT_ERROR'
export const PRODUCTS_POST_REQUEST = 'PRODUCTS_POST_REQUEST'
export const PRODUCTS_POST_SUCCESS = 'PRODUCTS_POST_SUCCESS'
export const PRODUCTS_POST_ERROR = 'PRODUCTS_POST_ERROR'
export const PRODUCTS_DELETE_REQUEST = 'PRODUCTS_DELETE_REQUEST'
export const PRODUCTS_DELETE_SUCCESS = 'PRODUCTS_DELETE_SUCCESS'
export const PRODUCTS_DELETE_ERROR = 'PRODUCTS_DELETE_ERROR'
export const PRODUCTS_SEARCH_REQUEST = 'PRODUCTS_SEARCH_REQUEST'
export const PRODUCTS_SEARCH_SUCCESS = 'PRODUCTS_SEARCH_SUCCESS'
export const PRODUCTS_SEARCH_ERROR = 'PRODUCTS_SEARCH_ERROR'
export const PRODUCTS_MANUFACTURE_FILTER = 'PRODUCTS_MANUFACTURE_FILTER'
export const PRODUCTS_CLIENT_CATEGORY_CLIENT_FILTER = 'PRODUCTS_CLIENT_CATEGORY_CLIENT_FILTER'

// Единици изиерения товара 
export const MEASURE_GET_REQUEST = 'MEASURE_GET_REQUEST'
export const MEASURE_GET_SUCCESS = 'MEASURE_GET_SUCCESS'
export const MEASURE_GET_ERROR = 'MEASURE_GET_ERROR'

// Категории товара 
export const CATEGORIES_GET_REQUEST = 'CATEGORIES_GET_REQUEST' 
export const CATEGORIES_GET_SUCCESS = 'CATEGORIES_GET_SUCCESS'
export const CATEGORIES_GET_ERROR = 'CATEGORIES_GET_ERROR'
export const CATEGORY_POST_REQUEST = 'CATEGORY_POST_REQUEST' 
export const CATEGORY_POST_SUCCESS = 'CATEGORY_POST_SUCCESS'
export const CATEGORY_POST_ERROR = 'CATEGORY_POST_ERROR'
export const CATEGORY_PUT_REQUEST = 'CATEGORY_PUT_REQUEST' 
export const CATEGORY_PUT_SUCCESS = 'CATEGORY_PUT_SUCCESS'
export const CATEGORY_PUT_ERROR = 'CATEGORY_PUT_ERROR'
export const CATEGORY_DELETE_REQUEST = 'CATEGORY_DELETE_REQUEST' 
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS'
export const CATEGORY_DELETE_ERROR = 'CATEGORY_DELETE_ERROR'

// Производители
export const MANUFACTURERS_GET_REQUEST = 'MANUFACTURERS_GET_REQUEST' 
export const MANUFACTURERS_GET_SUCCESS = 'MANUFACTURERS_GET_SUCCESS'
export const MANUFACTURERS_GET_ERROR = 'MANUFACTURERS_GET_ERROR'
export const MANUFACTUR_POST_REQUEST = 'MANUFACTUR_POST_REQUEST' 
export const MANUFACTUR_POST_SUCCESS = 'MANUFACTUR_POST_SUCCESS'
export const MANUFACTUR_POST_ERROR = 'MANUFACTUR_POST_ERROR'
export const MANUFACTUR_PUT_REQUEST = 'MANUFACTUR_PUT_REQUEST' 
export const MANUFACTUR_PUT_SUCCESS = 'MANUFACTUR_PUT_SUCCESS'
export const MANUFACTUR_PUT_ERROR = 'MANUFACTUR_PUT_ERROR'
export const MANUFACTUR_DELETE_REQUEST = 'MANUFACTUR_DELETE_REQUEST' 
export const MANUFACTUR_DELETE_SUCCESS = 'MANUFACTUR_DELETE_SUCCESS'
export const MANUFACTUR_DELETE_ERROR = 'MANUFACTUR_DELETE_ERROR'
export const MANUFACTURERS_LAZY_SUCCESS = 'MANUFACTURERS_LAZY_SUCCESS'
export const MANUFACTURERS_LAZY_REQUEST = 'MANUFACTURERS_LAZY_REQUEST'
export const MANUFACTURERS_SEARCH_REQUEST = 'MANUFACTURERS_SEARCH_REQUEST'
export const MANUFACTURERS_SEARCH_SUCCESS = 'MANUFACTURERS_SEARCH_SUCCESS'
export const MANUFACTURERS_SEARCH_ERROR = 'MANUFACTURERS_SEARCH_ERROR'


// Корзина
export const BASKET_ADD = 'BASKET_ADD'
export const BASKET_DELETE = 'BASKET_DELETE'
export const BASKET_CLEAR = 'BASKET_CLEAR'
export const BASKET_PAYMENT_CHANGE = 'BASKET_PAYMENT_CHANGE'
export const BASKET_ITEM_DELETE = 'BASKET_ITEM_DELETE'