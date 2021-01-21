import axios from '../../services/apiService'; 
import { Dispatch, SetStateAction } from 'react'
import { message } from 'antd'

import {
  MANUFACTURERS_GET_REQUEST,
  MANUFACTURERS_GET_SUCCESS,
  MANUFACTURERS_GET_ERROR,
  MANUFACTUR_POST_REQUEST,
  MANUFACTUR_POST_SUCCESS,
  MANUFACTUR_POST_ERROR,
  MANUFACTUR_PUT_REQUEST,
  MANUFACTUR_PUT_SUCCESS,
  MANUFACTUR_PUT_ERROR,
  MANUFACTUR_DELETE_REQUEST,
  MANUFACTUR_DELETE_SUCCESS,
  MANUFACTUR_DELETE_ERROR,
  MANUFACTURERS_LAZY_SUCCESS,
  MANUFACTURERS_LAZY_REQUEST,
  MANUFACTURERS_SEARCH_REQUEST,
  MANUFACTURERS_SEARCH_SUCCESS,
  MANUFACTURERS_SEARCH_ERROR,
  thunkType
} from '../actions';

import { manufactureType } from './types'

// Список производителей
  const getManufacturersRequested = () => ({
    type: MANUFACTURERS_GET_REQUEST,
  });

  const getManufacturersSuccess = (item: {[id: string]: manufactureType}) => ({
    type: MANUFACTURERS_GET_SUCCESS,
    payload: item,
  });

  const getManufacturersError = (error: string) => ({
    type: MANUFACTURERS_GET_ERROR,
    payload: error,
  }); 

  const getManufacturersRequest = async (id: string, skip?: number, take?: number) => {
    return axios.get('manufacture/', {
      params: {
        companyId: id,
        skip,
        take
      }
    })
      .then((response) => response.data);
  };  

  export const getManufacturers = (id: string, skip?: number, take?: number) :thunkType => (dispatch) => {
    dispatch(getManufacturersRequested());
    getManufacturersRequest(id, skip, take)
      .then((data) => dispatch(getManufacturersSuccess(data)))
      .catch((err) => dispatch(getManufacturersError(err)));
  };
//--------------

// Поиск производителей
  const searchManufacturersRequested = () => ({
    type: MANUFACTURERS_SEARCH_REQUEST,
  });

  const searchManufacturersSuccess = (item: {[id: string]: manufactureType}) => ({
    type: MANUFACTURERS_SEARCH_SUCCESS,
    payload: item,
  });

  const searchManufacturersError = (error: string) => ({
    type: MANUFACTURERS_SEARCH_ERROR,
    payload: error,
  }); 

  const searchManufacturersRequest = async (companyId: string, searchText: string) => {
    return axios.get('manufacture/search', {
      params: {
        companyId,
        searchText,
      }
    })
      .then((response) => response.data);
  };  

  export const searchManufacturers = (companyId: string, searchText: string) :thunkType => (dispatch) => {
    dispatch(searchManufacturersRequested());
    searchManufacturersRequest(companyId, searchText)
      .then((data) => dispatch(searchManufacturersSuccess(data)))
      .catch((err) => dispatch(searchManufacturersError(err)));
  };
//--------------

// Список производителей линивая загрузка
  const lazyManufacturersRequested = () => ({
    type: MANUFACTURERS_LAZY_REQUEST,
  });

  const lazyManufacturersSuccess = (item: {[id: string]: manufactureType}) => ({
    type: MANUFACTURERS_LAZY_SUCCESS,
    payload: item,
  }); 

  export const lazyManufacturers = (id: string, skip: number, take: number) :thunkType => (dispatch) => {
    dispatch(lazyManufacturersRequested());
    getManufacturersRequest(id, skip, take)
      .then((data) => dispatch(lazyManufacturersSuccess(data)))
      .catch((err) => dispatch(getManufacturersError(err)));
  };
//--------------

// Добавить категорий
  const postManufactureRequested = () => ({
    type: MANUFACTUR_POST_REQUEST,
  });

  const postManufactureSuccess = (item: manufactureType) => ({
    type: MANUFACTUR_POST_SUCCESS,
    payload: item,
  });

  const postManufactureError = (error: string) => ({
    type: MANUFACTUR_POST_ERROR,
    payload: error,
  }); 

  const postManufactureRequest = async (object: formItem) => {
    return axios.post('manufacture/', { ...object })
      .then((response) => response.data);
  };

  interface formItem {
    companyId: string, 
    phone: string, 
    email: string, 
    address: string, 
    manufacturerName: string
  }

  export const postManufacture = (object: formItem, setShowModal: Dispatch<SetStateAction<boolean>>
    ) :thunkType => (dispatch) => {
      dispatch(postManufactureRequested());
      postManufactureRequest(object)
        .then((data) => {
          dispatch(postManufactureSuccess(data));
          setShowModal(false);
          message.success('Производитель успешно добавлен');
        })
        .catch((err) => dispatch(postManufactureError(err)));
  };
//--------------

// Изменить категорию
  const putManufactureRequested = () => ({
    type: MANUFACTUR_PUT_REQUEST,
  });

  const putManufactureSuccess = (item: manufactureType) => ({
    type: MANUFACTUR_PUT_SUCCESS,
    payload: item,
  });

  const putManufactureError = (error: string) => ({
    type: MANUFACTUR_PUT_ERROR,
    payload: error,
  }); 

  const putManufactureRequest = async (object: putManufactureType) => {
    return axios.put('manufacture/', {
      ...object
    })
      .then((response) => response.data);
  };  

  interface putManufactureType {
    manufacturerId: string
    address: string
    manufacturerName: string
    email: string
    phone: string
  }

  export const putManufacture = (object: putManufactureType, setShowModal: Dispatch<SetStateAction<boolean>>
    ) :thunkType => (dispatch) => {
      dispatch(putManufactureRequested());
      putManufactureRequest(object)
        .then((data) => {
          dispatch(putManufactureSuccess(data)); 
          setShowModal(false);
          message.success("Данные производителя успешно изменены")
        })
        .catch((err) => dispatch(putManufactureError(err)));
  };
//--------------

// Удалить категорию
const deleteManufactureRequested = () => ({
  type: MANUFACTUR_DELETE_REQUEST,
});

const deleteManufactureSuccess = (item: string) => ({
  type: MANUFACTUR_DELETE_SUCCESS,
  payload: item,
});

const deleteCaregoryError = (error: string) => ({
  type: MANUFACTUR_DELETE_ERROR,
  payload: error,
}); 

const deleteManufactureRequest = async (manufacturerId: string) => {
  return axios.delete('manufacture/', {
    params: {
      manufacturerId
    }
  })
    .then((response) => response.data);
};  

export const deleteManufacture = (manufacturerId: string) :thunkType => (dispatch) => {
    dispatch(deleteManufactureRequested());
    deleteManufactureRequest(manufacturerId)
      .then((data) => {
        dispatch(deleteManufactureSuccess(data));
        message.success("Производитель успешно удален")
      })
      .catch((err) => { 
        message.error(err.response.data.message)
        dispatch(deleteCaregoryError(err))
      });
};
//--------------