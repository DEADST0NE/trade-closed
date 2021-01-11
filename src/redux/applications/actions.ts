import { message } from 'antd'

import axios from '../../services/apiService'; 

import {
  APPLICATIONS_GET_REQUEST,
  APPLICATIONS_GET_SUCCESS,
  APPLICATIONS_GET_ERROR, 

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

  thunkType
} from '../actions';

import { applicationType, stagesType } from './types'

// Детали заявки
export const setApplicationsDetail = (data: any) => ({
  type: DETAIL_APPLICATIONS_SET,
  payload: data,
});
// -------------

// Список заявок
  const getApplicationsRequested = () => ({
    type: APPLICATIONS_GET_REQUEST,
  });

  const getApplicationsSuccess = (item: applicationType) => ({
    type: APPLICATIONS_GET_SUCCESS,
    payload: item,
  });

  const getApplicationsError = (error: string) => ({
    type: APPLICATIONS_GET_ERROR,
    payload: error,
  }); 

  const getApplicationsRequest = async (id: string) => {
    return axios
      .get('application/applications', {
        params: { client_id: id },
      })
      .then((response) => response.data);
  };  

  export const getApplications = (id: string) :thunkType => (dispatch) => {
    dispatch(getApplicationsRequested());
    getApplicationsRequest(id)
      .then((data) => dispatch(getApplicationsSuccess(data)))
      .catch((err) => dispatch(getApplicationsError(err)));
  };
// -------------

// Следующий этап
  const postStagesRequested = () => ({
    type: STAGE_POST_REQUEST,
  });

  const postStagesSuccess = (item: stagesType[]) => ({
    type: STAGE_POST_SUCCESS,
    payload: item,
  });

  const postStagesError = (error: string) => ({
    type: STAGE_POST_ERROR,
    payload: error,
  }); 

  const postStagesRequest = async (applicationId: string, userId: string, stageId: number) => {
    return axios.post('application/stage', {
      applicationId,
      userId,
      stageId
    })
      .then((response) => response.data);
  };  

  export const postApplications = (applicationId: string, userId: string, stageId: number) :thunkType => (dispatch) => {
    dispatch(postStagesRequested());
    postStagesRequest(applicationId, userId, stageId)
      .then((data) => dispatch(postStagesSuccess(data)))
      .catch((err) => dispatch(postStagesError(err)));
  };
// --------------

// Список продуктов заяявки
const getProductsRequested = () => ({
  type: DETAIL_PRODUCTS_GET_REQUEST,
});

const getProductsSuccess = (item: any) => ({
  type: DETAIL_PRODUCTS_GET_SUCCESS,
  payload: item,
});

const getProductsError = (error: string) => ({
  type: DETAIL_PRODUCTS_GET_ERROR,
  payload: error,
}); 

const getProductsRequest = async (id: string) => {
  return axios
    .get('application/products', {
      params: { id },
    })
    .then((response) => response.data);
};  

export const getProducts = (id: string) :thunkType => (dispatch) => {
  dispatch(getProductsRequested());
  getProductsRequest(id)
    .then((data) => dispatch(getProductsSuccess(data)))
    .catch((err) => dispatch(getProductsError(err)));
};
// ------------------

// Добавление оплаты завки 
const postPaymentRequested = () => ({
  type: DETAIL_PAYMENT_POST_REQUEST,
});

const postPaymentSuccess = (item: any) => ({
  type: DETAIL_PAYMENT_POST_SUCCESS,
  payload: item,
});

const postPaymentError = (error: string) => ({
  type: DETAIL_PAYMENT_POST_ERROR,
  payload: error,
}); 

const postPaymentRequest = async (applicationId: string, userId: string, sumPay: number) => {
  return axios
    .post('application/payment', {
      applicationId,
      userId,
      sumPay
    })
    .then((response) => response.data);
};   

export const postPayment = ( applicationId: string, userId: string, sumPay: number, closedModFun: (bool: boolean) => void, setValue: (v: undefined) => void) :thunkType => (dispatch) => { 
    dispatch(postPaymentRequested());
    return postPaymentRequest(applicationId, userId, sumPay)
            .then((data) => {
              console.log(data);
              closedModFun(false);
              dispatch(postPaymentSuccess(data));
              setValue(undefined);
              message.success('Оплата добавлена');
          })
    .catch((err) => {
      message.error(err.response.data.message);
      dispatch(postPaymentError(err));
      
    });
};
// -----------------

// Список оплаты завки
const getPaymentsRequested = () => ({
  type: DETAIL_PAYMENTS_GET_REQUEST,
});

const getPaymentsSuccess = (item: any) => ({
  type: DETAIL_PAYMENTS_GET_SUCCESS,
  payload: item,
});

const getPaymentsError = (error: string) => ({
  type: DETAIL_PAYMENTS_GET_ERROR,
  payload: error,
}); 

const getApplicationPaymentsRequest = async (id: string) => {
  return axios
    .get('application/payments', {
      params: { id },
    })
    .then((response) => response.data);
};  

export const getApplicationPayments = (id: string) :thunkType => (dispatch) => { 
  dispatch(getPaymentsRequested());
  getApplicationPaymentsRequest(id)
    .then((data) => dispatch(getPaymentsSuccess(data)))
    .catch((err) => dispatch(getPaymentsError(err)));
};
// ------------------