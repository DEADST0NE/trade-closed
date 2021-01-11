import {
  SET_USER_DATA,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../actions';

export interface errorType {
  email?: string,
  password?: string,
  message: string,
}

export interface userDataType {
  data: {
    id: string;
    name: string; 
    email: string; 
    address?: string;
    companyId: string;
    job: string;
  }
  exp: number;
  iat: number;
  sub: string;
}

export type initStateType = {
  userData: userDataType | null;
  loading: boolean;
  error: errorType | null;
}

export interface loginUserParamType {
  email: string;
  password: string;
}

interface setUserType {
  type: typeof SET_USER_DATA;
  payload: any;
}

interface loginUserSuccessType {
  type: typeof LOGIN_USER_SUCCESS;
  payload: any
}

interface loginUserRequestType {
  type: typeof LOGIN_USER_REQUEST;
}

interface loginUserErrorType {
  type: typeof LOGIN_USER_ERROR;
  payload: errorType;
}

interface logoutUserType {
  type: typeof LOGOUT_USER;
}

export type LoginActonsTypes =
  | setUserType
  | loginUserSuccessType
  | loginUserRequestType
  | loginUserErrorType
  | logoutUserType;