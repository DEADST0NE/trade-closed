import axios from '../../services/apiService'; 

import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_ERROR,
  thunkType
} from '../actions';

import { categoryType } from './types'

// Список этапов
  const getCaregoriesRequested = () => ({
    type: CATEGORIES_GET_REQUEST,
  });

  const getCaregoriesSuccess = (item: categoryType[]) => ({
    type: CATEGORIES_GET_SUCCESS,
    payload: item,
  });

  const getCaregoriesError = (error: string) => ({
    type: CATEGORIES_GET_ERROR,
    payload: error,
  }); 

  const getCaregoriesRequest = async (id: string) => {
    return axios.get('categories/', {
      params: {
        companyId: id
      }
    })
      .then((response) => response.data);
  };  

  export const getCaregories = (id: string) :thunkType => (dispatch) => {
    dispatch(getCaregoriesRequested());
    getCaregoriesRequest(id)
      .then((data) => dispatch(getCaregoriesSuccess(data)))
      .catch((err) => dispatch(getCaregoriesError(err)));
  };
//--------------