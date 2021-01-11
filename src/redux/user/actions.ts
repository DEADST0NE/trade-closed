import jwtDecode from 'jwt-decode'; 

import axios from '../../services/apiService';
import { setAuthData, resetAuthData } from '../../services/authService';

import { errorType, loginUserParamType, userDataType } from './types'

import {
  SET_USER_DATA,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  thunkType,
} from '../actions';

const setUserData = (token: string) => ({ type: SET_USER_DATA, payload: jwtDecode(token) });

const loginUserRequested = () => ({
  type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = (item: userDataType) => ({
  type: LOGIN_USER_SUCCESS,
  payload: item,
});

const loginUserError = (error: errorType) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

const logoutUser = (pathPush: (path: string) => void) => {
  resetAuthData();
  pathPush('/'); 
  return {
    type: LOGOUT_USER,
  };
};

const loginUserRequest = async ({ email, password }: {email: string, password: string}) => {
  return axios
    .post(`auth/login`, {
      email,
      password,
    })
    .then((response) => response.data);
};

type pathPushType = (path: string) => void;

const loginUser = (object: loginUserParamType, historyPush: pathPushType): thunkType => dispatch => {
  dispatch(loginUserRequested());
  loginUserRequest(object)
    .then((data) => {
      setAuthData(data);
      historyPush('/')
      return dispatch(loginUserSuccess(jwtDecode(data.token)));
    })
    .catch((err) => dispatch(loginUserError(err.response.data)));
};

export { setUserData, loginUser, logoutUser };
