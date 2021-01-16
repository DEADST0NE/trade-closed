import axios from '../../services/apiService'; 

import {
  STAGES_GET_REQUEST,
  STAGES_GET_SUCCESS,
  STAGES_GET_ERROR,
  thunkType
} from '../actions';

import { dictionaryType } from './types'

// Список этапов
  const getStagesRequested = () => ({
    type: STAGES_GET_REQUEST,
  });

  const getStagesSuccess = (item: dictionaryType[]) => ({
    type: STAGES_GET_SUCCESS,
    payload: item,
  });

  const getStagesError = (error: string) => ({
    type: STAGES_GET_ERROR,
    payload: error,
  }); 

  const getStagesRequest = async () => {
    return axios.get('dictionary/stages')
      .then((response) => response.data);
  };  

  export const getStages = () :thunkType => (dispatch) => {
    dispatch(getStagesRequested());
    getStagesRequest()
      .then((data) => dispatch(getStagesSuccess(data)))
      .catch((err) => dispatch(getStagesError(err)));
  };
//--------------