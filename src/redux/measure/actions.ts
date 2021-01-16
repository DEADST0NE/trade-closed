import axios from '../../services/apiService'; 

import {
  MEASURE_GET_REQUEST,
  MEASURE_GET_SUCCESS,
  MEASURE_GET_ERROR,
  thunkType
} from '../actions';

import { dictionaryType } from './types'

// Список единици изиерения массы
  const getMeasureRequested = () => ({
    type: MEASURE_GET_REQUEST,
  });

  const getMeasureSuccess = (item: dictionaryType[]) => ({
    type: MEASURE_GET_SUCCESS,
    payload: item,
  });

  const getMeasureError = (error: string) => ({
    type: MEASURE_GET_ERROR,
    payload: error,
  }); 

  const getMeasureRequest = async () => {
    return axios.get('dictionary/measures')
      .then((response) => response.data);
  };  

  export const getMeasures = () :thunkType => (dispatch) => {
    dispatch(getMeasureRequested());
    getMeasureRequest()
      .then((data) => dispatch(getMeasureSuccess(data)))
      .catch((err) => dispatch(getMeasureError(err)));
  };
//--------------