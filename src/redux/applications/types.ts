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
} from '../actions';

export interface errorType { 
  message: string,
}

export interface stagesType {
  value: number;
  label: string;
}

// interface dataType<TValue> {
//   [id: string]: TValue;
// }

export interface applicationType {
  id: string;
  number: number;
  date: {
    date: string;
    time: string;
  }
  paid: number;
  pay: number;
  stages: number[];
  clientAddress: string;
  clientEmail: string;
  clientName: string;
  clientTel1: string;
}

export type initStateType = {
  applications: any;
  loading: boolean;
  error: errorType | null;

  stageLoading: boolean;
  stageError: errorType | null,

  detailInfo: applicationType | null;

  products: productsType[] | null;
  loadingProducts: boolean;
  errorProducts: errorType | null;

  payments: paymentsType[] | null;
  loadingPayments: boolean;
  errorPayments: errorType | null;
} 

interface applicationsGetRequestType {
  type: typeof APPLICATIONS_GET_REQUEST;
}
interface applicationsGetSuccessType {
  type: typeof APPLICATIONS_GET_SUCCESS;
  payload: any
}
interface applicationsGetErrorType {
  type: typeof APPLICATIONS_GET_ERROR;
  payload: errorType
}

interface stagesPostRequestType {
  type: typeof STAGE_POST_REQUEST;
}
interface stagesPostSuccessType {
  type: typeof STAGE_POST_SUCCESS;
  payload: any
}
interface stagesPostErrorType {
  type: typeof STAGE_POST_ERROR;
  payload: errorType
}

export interface errorType {
  message: string,
}

interface productsType {
  id: string;
  productName: string;
  count: number;
  total: number;
}

interface paymentsType {
  id: string;
  number: number;
  date: string;
  count: number;
  employeeName: string;
  employeeJobPos: string;
}


interface detailApplicationsSet {
  type: typeof DETAIL_APPLICATIONS_SET;
  payload: any
}

interface detailApplicationsSet {
  type: typeof DETAIL_APPLICATIONS_SET;
  payload: any
}

interface detailGetProductsRequest {
  type: typeof DETAIL_PRODUCTS_GET_REQUEST;
}

interface detailGetProductsSuccess {
  type: typeof DETAIL_PRODUCTS_GET_SUCCESS;
  payload: any
}

interface detailGetProductsError {
  type: typeof DETAIL_PRODUCTS_GET_ERROR;
  payload: errorType
}


interface detailGetPaymentsRequest {
  type: typeof DETAIL_PAYMENTS_GET_REQUEST;
}

interface detailGetPaymentsSuccess {
  type: typeof DETAIL_PAYMENTS_GET_SUCCESS;
  payload: any
}

interface detailGetPaymentsError {
  type: typeof DETAIL_PAYMENTS_GET_ERROR;
  payload: errorType
}

interface detailPostPaymentRequest {
  type: typeof DETAIL_PAYMENT_POST_REQUEST;
}

interface detailPostPaymentSuccess {
  type: typeof DETAIL_PAYMENT_POST_SUCCESS;
  payload: any
}

interface detailPostPaymentError {
  type: typeof DETAIL_PAYMENT_POST_ERROR;
  payload: errorType
}

export type ApplicationsActionsType =
  | applicationsGetRequestType
  | applicationsGetSuccessType
  | applicationsGetErrorType
  | stagesPostRequestType
  | stagesPostSuccessType
  | stagesPostErrorType
  | detailApplicationsSet
  | detailGetProductsRequest
  | detailGetProductsSuccess
  | detailGetProductsError
  | detailGetPaymentsRequest
  | detailGetPaymentsSuccess
  | detailGetPaymentsError
  | detailPostPaymentRequest
  | detailPostPaymentSuccess
  | detailPostPaymentError;;