import axios from '../../services/apiService'; 

import {
  COMPANY_GET_REQUEST,
  COMPANY_GET_SUCCESS,
  COMPANY_GET_ERROR,
  thunkType
} from '../actions';

//import { dictionaryType } from './types'

// Список этапов
  const getCompanyRequested = () => ({
    type: COMPANY_GET_REQUEST,
  });

  const getCompanySuccess = (item: any) => ({
    type: COMPANY_GET_SUCCESS,
    payload: item,
  });

  const getCompanyError = (error: string) => ({
    type: COMPANY_GET_ERROR,
    payload: error,
  }); 

  const getCompanyRequest = async (id: string) => {
    return axios.get('company/', {
      params: {
        id
      }
    })
      .then((response) => response.data);
  };  

  export const getCompany = (id: string) :thunkType => (dispatch) => {
    dispatch(getCompanyRequested());
    getCompanyRequest(id)
      .then((data) => dispatch(getCompanySuccess(data)))
      .catch((err) => dispatch(getCompanyError(err)));
  };
//--------------