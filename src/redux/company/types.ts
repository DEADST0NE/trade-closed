import {
  COMPANY_GET_REQUEST,
  COMPANY_GET_SUCCESS,
  COMPANY_GET_ERROR,
} from '../actions';

export interface errorType {
  message: string,
}

export interface companyType {
  value: number;
  label: string;
}

export type initStateType = {
  company: any;
  loading: boolean;
  error: errorType | null;
} 

interface cpmpanyGetErrorType {
  type: typeof COMPANY_GET_ERROR;
  payload: errorType
}
interface cpmpanyGetSuccessType {
  type: typeof COMPANY_GET_SUCCESS;
  payload: any
}
interface cpmpanyGetRequestType {
  type: typeof COMPANY_GET_REQUEST;
}

export type CompanyActionsType =
  | cpmpanyGetErrorType
  | cpmpanyGetSuccessType
  | cpmpanyGetRequestType;