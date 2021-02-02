import {
  APPLICATIONS_GET_REQUEST,
  APPLICATIONS_GET_SUCCESS,
  APPLICATIONS_GET_ERROR, 

  APPLICATION_POST_REQUEST,
  APPLICATION_POST_SUCCESS,
  APPLICATION_POST_ERROR,

  STAGE_POST_REQUEST,
  STAGE_POST_SUCCESS,
  STAGE_POST_ERROR,

  DETAIL_APPLICATIONS_SET,

  DETAIL_PRODUCTS_GET_REQUEST,
  DETAIL_PRODUCTS_GET_SUCCESS,
  DETAIL_PRODUCTS_GET_ERROR,

  DETAIL_PAYMENTS_GET_REQUEST,
  DETAIL_PAYMENTS_GET_SUCCESS,
  DETAIL_PAYMENTS_GET_ERROR,

  DETAIL_PAYMENT_POST_SUCCESS,
  DETAIL_PAYMENT_POST_ERROR,
  DETAIL_PAYMENT_POST_REQUEST,

  DETAIL_PAYMENT_PUT_SUCCESS,
  DETAIL_PAYMENT_PUT_ERROR,
  DETAIL_PAYMENT_PUT_REQUEST,
} from '../actions';

import { initStateType, ApplicationsActionsType } from './types'

const INIT_STATE: initStateType = {
  // Заявки
    applications: [],
    loading: false,
    error: null,
    
    applicationPost: null,
    loadingPost: false,
    errorPost: null,
  // Этап
    stageLoading: false,
    stageError: null,
  // Детали
    detailInfo: null,
  // Продкуты
    products: [],
    loadingProducts: false,
    errorProducts: null,
  // Оплата
    payments: [],
    loadingPayments: false,
    errorPayments: null
};

const reducer = (state = INIT_STATE, action: ApplicationsActionsType): initStateType => {
  switch (action.type) {
    // Список заявок
      case APPLICATIONS_GET_ERROR:
        return {
          ...state,
          loading: false, 
          error: action.payload,
        };

      case APPLICATIONS_GET_REQUEST:
        return {
          ...state,
          applicationPost: null,
          loading: true,
          error: null,
        };

      case APPLICATIONS_GET_SUCCESS: 
        return {
          ...state,
          applications: action.payload,
          loading: false,
        };
    // ----------
    // Добаавление заявки
      case APPLICATION_POST_ERROR:
        return {
          ...state,
          loadingPost: false, 
          errorPost: action.payload,
        };

      case APPLICATION_POST_REQUEST:
        return {
          ...state,
          applicationPost: null,
          loadingPost: true,
          errorPost: null,
        };

      case APPLICATION_POST_SUCCESS: 
        return {
          ...state,
          applicationPost: action.payload,
          loadingPost: false,
          errorPost: null,
        };
    // ----------
    // Смена этапа
      case STAGE_POST_ERROR:
        return {
          ...state,
          stageLoading: false, 
          stageError: action.payload,
        };

      case STAGE_POST_REQUEST:
        return {
          ...state,
          stageLoading: true,
          stageError: null,
        };

      case STAGE_POST_SUCCESS:
        state.applications[action.payload.applicationId].stages.unshift(action.payload.stage);
        return {
          ...state,
          stageLoading: false,
        };
    // -------------------
    // Детали заявки
      case DETAIL_APPLICATIONS_SET:
        return {
          ...state,
          detailInfo: action.payload,
        };
    //---------------------
    // Список продуктов заяявки
      case DETAIL_PRODUCTS_GET_REQUEST: 
        return {
          ...state,
          loadingProducts: true,
          errorProducts: null,
        };

      case DETAIL_PRODUCTS_GET_SUCCESS: 
        return {
          ...state,
          loadingProducts: false,
          products: action.payload
        };

      case DETAIL_PRODUCTS_GET_ERROR: 
        return {
          ...state,
          loadingProducts: false,
          errorProducts: action.payload
        };
    //---------------------
    // Список оплаты заявки
      case DETAIL_PAYMENTS_GET_REQUEST: 
        return {
          ...state,
          loadingPayments: true,
          errorPayments: null,
        };

      case DETAIL_PAYMENTS_GET_SUCCESS: 
        return {
          ...state,
          loadingPayments: false,
          payments: action.payload
        };

      case DETAIL_PAYMENTS_GET_ERROR: 
        return {
          ...state,
          loadingPayments: false,
          errorPayments: action.payload
        };
    //-------
    //Добавление оплаты
      case DETAIL_PAYMENT_POST_REQUEST: 
        return {
          ...state,
          loadingPayments: true,
          errorPayments: null,
        };

      case DETAIL_PAYMENT_POST_SUCCESS:
        state.applications[action.payload.applicationId].paid = action.payload.paid;
        state.payments?.push(action.payload);
        return {
          ...state,
          loadingPayments: false,
        };

      case DETAIL_PAYMENT_POST_ERROR: 
        return {
          ...state,
          loadingPayments: false,
          errorPayments: action.payload
        };
    //
    //Изменение оплаты
    case DETAIL_PAYMENT_PUT_REQUEST: 
    return {
      ...state,
      loadingPayments: true,
      errorPayments: null,
    };

  case DETAIL_PAYMENT_PUT_SUCCESS: 
    return {
      ...state,
      loadingPayments: false,
    };

  case DETAIL_PAYMENT_PUT_ERROR: 
    return {
      ...state,
      loadingPayments: false,
    };
//
    
    default:
      return state;
  }
};

export default reducer;