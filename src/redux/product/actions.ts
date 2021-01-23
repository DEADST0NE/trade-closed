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
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_DELETE_ERROR,
  PRODUCTS_SEARCH_REQUEST,
  PRODUCTS_SEARCH_SUCCESS,
  PRODUCTS_SEARCH_ERROR,
  PRODUCTS_MANUFACTURE_FILTER,
  thunkType
} from '../actions';

import { productsTypeObject, productType } from './types'

// Фильтр для продуктов
  export const productManufactureFilter = (item: string) => ({
    type: PRODUCTS_MANUFACTURE_FILTER,
    payload: item,
  });
//---------------------

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

  const getProductsRequest = async (id: string, typeId: string, skip: number, take: number, manufactureFilter?: string[]) => {
    return axios.get('product/', {
      params: {
        companyId: id,
        categoryId: typeId,
        skip,
        take,
        manufactureFilter
      }
    })
      .then((response) => response.data);
  };  

  export const getProducts = (id: string, typeId: string, skip: number, take: number, manufactureFilter?: string[]) :thunkType => (dispatch) => {
    dispatch(getProductsRequested());
    getProductsRequest(id, typeId, skip, take, manufactureFilter)
      .then((data) => {
        dispatch(getProductsSuccess(data))
      })
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

  export const getProductslazy = (id: string, typeId: string, skip: number, take: number, manufactureFilter?: string[]) :thunkType => (dispatch) => {
    dispatch(getProductslazyRequested());
    getProductsRequest(id, typeId, skip, take, manufactureFilter)
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

  const putProductsSuccess = (item: {id: string}) => ({
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
      manufactureId: object.manufacturer,
      code: object.code
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

// Удаление продукта
  const deleteProductsRequested = () => ({
    type: PRODUCTS_DELETE_REQUEST,
  });

  const deleteProductsSuccess = (item: productType) => ({
    type: PRODUCTS_DELETE_SUCCESS,
    payload: item,
  });

  const deleteProductsError = (error: string) => ({
    type: PRODUCTS_DELETE_ERROR,
    payload: error,
  }); 

  const deleteProductsRequest = async (id: string) => {
    return axios.delete('product/', {
      params: {
        productId: id,
      }
    })
      .then((response) => response.data);
  };  

  export const deleteProducts = (id: string) :thunkType => (dispatch) => {
    dispatch(deleteProductsRequested());
    deleteProductsRequest(id)
      .then((data) => {
        message.success('Продукт успешно удален')
        dispatch(deleteProductsSuccess(data));
      })
      .catch((err) => dispatch(deleteProductsError(err)));
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
      description: object.info,
      productsName: object.title,
      code: object.code,
      manufacturerId: object.manufacturer, 
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

// Поиск продуктов
const searchProductsRequested = () => ({
  type: PRODUCTS_SEARCH_REQUEST,
});

const searchProductsSuccess = (item: productType[]) => ({
  type: PRODUCTS_SEARCH_SUCCESS,
  payload: item,
});

const searchProductsError = (error: string) => ({
  type: PRODUCTS_SEARCH_ERROR,
  payload: error,
}); 

const searchProductsRequest = async (companyId: string, categoryId: string, searchText: string, filterManufacture?: string[]) => {
  return axios.get('product/search', {
    params: {
      companyId,
      categoryId,
      searchText,
      filterManufacture
    }
  }).then((response) => response.data);
};  

export const searchProducts = (companyId: string, categoryId: string, searchText: string, filterManufacture?: string[]) :thunkType => (dispatch) => {
  dispatch(searchProductsRequested());
  searchProductsRequest(companyId, categoryId, searchText, filterManufacture)
    .then((data) =>  dispatch(searchProductsSuccess(data)))
    .catch((err) => dispatch(searchProductsError(err)));
};
//--------------