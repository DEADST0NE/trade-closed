import axios from '../../services/apiService'; 
import { Dispatch, SetStateAction } from 'react'
import { message } from 'antd'

import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_ERROR,
  CATEGORY_POST_REQUEST,
  CATEGORY_POST_SUCCESS,
  CATEGORY_POST_ERROR,
  CATEGORY_PUT_REQUEST,
  CATEGORY_PUT_SUCCESS,
  CATEGORY_PUT_ERROR,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_ERROR,
  thunkType
} from '../actions';

import { categoryType } from './types'

// Список категорий
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

// Добавить категорий
  const postCaregoryRequested = () => ({
    type: CATEGORY_POST_REQUEST,
  });

  const postCaregorySuccess = (item: categoryType) => ({
    type: CATEGORY_POST_SUCCESS,
    payload: item,
  });

  const postCaregoryError = (error: string) => ({
    type: CATEGORY_POST_ERROR,
    payload: error,
  }); 

  const postCaregoryRequest = async (companyId: string, categoryName: string) => {
    return axios.post('categories/', {
      companyId,
      categoryName
    })
      .then((response) => response.data);
  };  

  export const postCaregory = (companyId: string, categoryName: string, setShowModal: Dispatch<SetStateAction<boolean>>) :thunkType => (dispatch) => {
    dispatch(postCaregoryRequested());
    postCaregoryRequest(companyId, categoryName)
      .then((data) => {
        dispatch(postCaregorySuccess(data));
        dispatch(getCaregories(companyId));
        setShowModal(false);
      })
      .catch((err) => dispatch(postCaregoryError(err)));
  };
//--------------

// Изменить категорию
  const putCaregoryRequested = () => ({
    type: CATEGORY_PUT_REQUEST,
  });

  const putCaregorySuccess = (item: categoryType) => ({
    type: CATEGORY_PUT_SUCCESS,
    payload: item,
  });

  const putCaregoryError = (error: string) => ({
    type: CATEGORY_PUT_ERROR,
    payload: error,
  }); 

  const putCaregoryRequest = async (categoryId: string, categoryName: string) => {
    return axios.put('categories/', {
      categoryId,
      categoryName
    })
      .then((response) => response.data);
  };  

  export const putCaregory = (
      companyId: string, 
      categoryId: string, 
      categoryName: string, 
      setShowModal: Dispatch<SetStateAction<boolean>>
    ) :thunkType => (dispatch) => {
      dispatch(putCaregoryRequested());
      putCaregoryRequest(categoryId, categoryName)
        .then((data) => {
          dispatch(putCaregorySuccess(data));
          dispatch(getCaregories(companyId));
          setShowModal(false);
        })
        .catch((err) => dispatch(putCaregoryError(err)));
  };
//--------------

// Удалить категорию
const deleteCaregoryRequested = () => ({
  type: CATEGORY_DELETE_REQUEST,
});

const deleteCaregorySuccess = (item: categoryType) => ({
  type: CATEGORY_DELETE_SUCCESS,
  payload: item,
});

const deleteCaregoryError = (error: string) => ({
  type: CATEGORY_DELETE_ERROR,
  payload: error,
}); 

const deleteCaregoryRequest = async (categoryId: string) => {
  return axios.delete('categories/', {
    params: {
      categoryId
    }
  })
    .then((response) => response.data);
};  

export const deleteCaregory = (companyId: string, categoryId: string) :thunkType => (dispatch) => {
    dispatch(deleteCaregoryRequested());
    deleteCaregoryRequest(categoryId)
      .then((data) => {
        dispatch(deleteCaregorySuccess(data));
        dispatch(getCaregories(companyId)); 
      })
      .catch((err) => { 
        message.error(err.response.data.message)
        dispatch(deleteCaregoryError(err))
      });
};
//--------------