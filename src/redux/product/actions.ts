import axios from '../../services/apiService'; 
import { Dispatch, SetStateAction }  from 'react'
import { message } from 'antd'

import {
  PRODUCTS_GET_REQUEST,
  PRODUCTS_GET_SUCCESS,
  PRODUCTS_GET_ERROR,
  PRODUCTS_LAZY_SUCCESS,
  PRODUCTS_LAZY_REQUEST,
  PRODUCTS_PUT_REQUEST,
  PRODUCTS_PUT_SUCCESS,
  PRODUCTS_PUT_ERROR,
  PRODUCTS_POST_REQUEST,
  PRODUCTS_POST_SUCCESS,
  PRODUCTS_POST_ERROR,
  thunkType
} from '../actions';

import { productsTypeObject, productType } from './types'

// Список продуктов
  const getProductsRequested = () => ({
    type: PRODUCTS_GET_REQUEST,
  });

  const getProductsSuccess = (item: productsTypeObject) => ({
    type: PRODUCTS_GET_SUCCESS,
    payload: item,
  });

  const getProductsError = (error: string) => ({
    type: PRODUCTS_GET_ERROR,
    payload: error,
  }); 

  const getProductsRequest = async (id: string, skip: number, take: number) => {
    return axios.get('product/', {
      params: {
        company_id: id,
        skip,
        take,
      }
    })
      .then((response) => response.data);
  };  

  export const getProducts = (id: string, skip: number, take: number) :thunkType => (dispatch) => {
    dispatch(getProductsRequested());
    getProductsRequest(id, skip, take)
      .then((data) => dispatch(getProductsSuccess(data)))
      .catch((err) => dispatch(getProductsError(err)));
  };
//--------------

// Линивая загрузка
  const getProductslazyRequested = () => ({
    type: PRODUCTS_LAZY_REQUEST
  });

  const getProductslazySuccess = (item: productsTypeObject) => ({
    type: PRODUCTS_LAZY_SUCCESS,
    payload: item,
  });

  export const getProductslazy = (id: string, skip: number, take: number) :thunkType => (dispatch) => {
    dispatch(getProductslazyRequested());
    getProductsRequest(id, skip, take)
      .then((data) => {
        dispatch(getProductslazySuccess(data))
      })
      .catch((err) => dispatch(getProductsError(err)));
  };
//--------------

// Изменение продукта
  const putProductsRequested = () => ({
    type: PRODUCTS_PUT_REQUEST,
  });

  const putProductsSuccess = (item: productType) => ({
    type: PRODUCTS_PUT_SUCCESS,
    payload: item,
  });

  const putProductsError = (error: string) => ({
    type: PRODUCTS_PUT_ERROR,
    payload: error,
  }); 

  const putProductsRequest = async (object: any) => {
    return axios.put('product/', {
      description: object.info,
      productsId: object.id,
      productsName: object.title,
      measureType: object.type,
      weight: object.weight,
      priceArray: object.price,
      imgProduct: object.imgProduct,
      сategoryId: object.category,
    })
      .then((response) => response.data);
  };  

  export const putProducts = (object: any, setModal: Dispatch<SetStateAction<boolean>>) :thunkType => (dispatch) => {
    dispatch(putProductsRequested());
    putProductsRequest(object)
      .then((data) => {
        dispatch(putProductsSuccess(data));
        setModal(false);
        message.success('Продукт успешно изменен');
      })
      .catch((err) => dispatch(putProductsError(err)));
  };
//--------------

// Добавление продукта
  const postProductsRequested = () => ({
    type: PRODUCTS_POST_REQUEST,
  });

  const postProductsSuccess = (item: productType) => ({
    type: PRODUCTS_POST_SUCCESS,
    payload: item,
  });

  const postProductsError = (error: string) => ({
    type: PRODUCTS_POST_ERROR,
    payload: error,
  }); 

  const postProductsRequest = async (object: any) => {
    return axios.post('product/', {
      companyId: object.companyId,
      description: object.info,
      productsId: object.id,
      productsName: object.title,
      measureType: object.type,
      weight: object.weight,
      priceArray: object.price,
      imgProduct: object.imgProduct,
      сategoryId: object.category,
    })
      .then((response) => response.data);
  };  

  export const postProducts = (object: any, setModal: Dispatch<SetStateAction<boolean>>) :thunkType => (dispatch) => {
    dispatch(postProductsRequested());
    postProductsRequest(object)
      .then((data) => {
        dispatch(postProductsSuccess(data));
        setModal(false);
        message.success('Продукт успешно добавлен');
      })
      .catch((err) => dispatch(postProductsError(err)));
  };
//--------------