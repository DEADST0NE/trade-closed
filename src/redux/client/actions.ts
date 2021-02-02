import { message } from 'antd'

import axios from '../../services/apiService'; 

import {
  CLIENTS_GET_REQUEST,
  CLIENTS_GET_SUCCESS,
  CLIENTS_GET_ERROR,
  CLIENTS_POST_SUCCESS,
  CLIENTS_POST_REQUEST,
  CLIENTS_POST_ERROR,
  CLIENTS_DELETE_SUCCESS,
  CLIENTS_DELETE_REQUEST,
  CLIENTS_DELETE_ERROR,
  CLIENTS_SEARCH_GET_SUCCESS,
  CLIENTS_SEARCH_GET_REQUEST,
  CLIENTS_SEARCH_GET_ERROR,
  CLIENTS_CATEGORY_GET_REQUEST,
  CLIENTS_CATEGORY_GET_SUCCESS,
  CLIENTS_CATEGORY_GET_ERROR,
  CLIENTS_CATEGORY_POST_SUCCESS,
  CLIENTS_CATEGORY_DELETE_SUCCESS,
  CLIENTS_CATEGORY_PUT_SUCCESS,
  thunkType
} from '../actions';

import { clientsType, categoryClientType } from './types'

// Список клиентов компании
  const getClientRequested = () => ({
    type: CLIENTS_GET_REQUEST,
  });

  const getClientSuccess = (item: clientsType[]) => ({
    type: CLIENTS_GET_SUCCESS,
    payload: item,
  });

  const getClientError = (error: string) => ({
    type: CLIENTS_GET_ERROR,
    payload: error,
  }); 

  const getClientRequest = async (companieId: string, searchText?: string) => {
    return axios.get('company/clients', {
      params: {
        companieId,
        searchText
      }
    })
      .then((response) => response.data);
  };  

  export const getClient = (companieId: string, searchText?: string) :thunkType => (dispatch) => {
    dispatch(getClientRequested());
    getClientRequest(companieId, searchText)
      .then((data) => dispatch(getClientSuccess(data)))
      .catch((err) => dispatch(getClientError(err)));
  };
//--------------

// Добавление клиента в компанию

  const postClientRequested = () => ({
    type: CLIENTS_POST_REQUEST,
  });

  export const postClientError = () => ({
    type: CLIENTS_POST_ERROR,
  });

  const postClientSuccess = (item: clientsType[]) => ({
    type: CLIENTS_POST_SUCCESS,
    payload: item,
  }); 

  const postClientRequest = async (companyId: string, clientId: string) => {
    return axios.post('company/client', {
      companyId,
      clientId
    }).then((response) => response.data);
  };  

  export const postClient = (companyId: string, clientId: string, closedWindow: () => void) :thunkType => (dispatch) => {
    dispatch(postClientRequested());
    postClientRequest(companyId, clientId)
      .then((data) => {
        closedWindow();
        message.success('Клиент добавлен')
        dispatch(postClientSuccess(data));
      })
      .catch((err) => {
        dispatch(postClientError()); 
        message.error(`Ошибка, добавление клиента не возможено. ${err.response.data.message}`)
      });
  }; 

// -------------

// Удаление клиента из списка
  const deleteClientRequested = () => ({
    type: CLIENTS_DELETE_REQUEST,
  });

  const deleteClientSuccess = (item: clientsType[]) => ({
    type: CLIENTS_DELETE_SUCCESS,
    payload: item,
  });

  const deleteClientError = (error: string) => ({
    type: CLIENTS_DELETE_ERROR,
    payload: error,
  }); 

  const deleteClientRequest = async (id: string) => {
    return axios.delete('company/client', {
      params: {
        id,
      }
    })
      .then((response) => response.data);
  };  

  export const deleteClient = (id: string) :thunkType => (dispatch) => {
    dispatch(deleteClientRequested());
    deleteClientRequest(id)
      .then((data) => {
        message.success('Клиент успешно удален');
        dispatch(deleteClientSuccess(data));
      })
      .catch((err) => {
        message.error(`Ошибка, удаление клиента не возможено. ${err.response.data.message}`);
        dispatch(deleteClientError(err.response.data.message));
      });
  };
//--------------

// Поиск клиента

  const getClientSearchRequested = () => ({
    type: CLIENTS_SEARCH_GET_REQUEST,
  });

  export const getClientSearchError = () => ({
    type: CLIENTS_SEARCH_GET_ERROR,
  });

  const getClientSearchSuccess = (item: clientsType[]) => ({
    type: CLIENTS_SEARCH_GET_SUCCESS,
    payload: item,
  }); 

  const getClientSearchRequest = async (searchText: string) => {
    return axios.get('company/search/clients', {
      params: {
        searchText,
      }
    }).then((response) => response.data);
  };  

  export const getClientSearch = (searchText: string) :thunkType => (dispatch) => {
    dispatch(getClientSearchRequested());
    getClientSearchRequest(searchText)
      .then((data) => dispatch(getClientSearchSuccess(data)))
      .catch((err) => {
        dispatch(getClientSearchError());
        message.error(`Ошибка, поиск клиента не возможен. ${err.response.data.message}`)
      });
  }; 

// ------------- 

// Список категорий клиентов
  const getClientCategoryRequested = () => ({
    type: CLIENTS_CATEGORY_GET_REQUEST,
  });

  const getClientCategorySuccess = (item: clientsType[]) => ({
    type: CLIENTS_CATEGORY_GET_SUCCESS,
    payload: item,
  });

  const getClientCategoryError = (error: string) => ({
    type: CLIENTS_CATEGORY_GET_ERROR,
    payload: error,
  }); 

  const getClientCategoryRequest = async (companieId: string) => {
    return axios.get('company/client/category', {
      params: {
        companieId,
      }
    }).then((response) => response.data);
  };  

  export const getClientCategory = (companieId: string) :thunkType => (dispatch) => {
    dispatch(getClientCategoryRequested());
    getClientCategoryRequest(companieId)
      .then((data) => dispatch(getClientCategorySuccess(data)))
      .catch((err) => dispatch(getClientCategoryError(err)));
  }; 
// ----------------

// Добавление категорий клиентов
  const postClientCategorySuccess = (item: categoryClientType) => ({
    type: CLIENTS_CATEGORY_POST_SUCCESS,
    payload: item,
  });

  const postClientCategoryRequest = async (companyId: string, categodyValue: string) => {
    return axios.post('company/client/category', {
      companyId,
      categodyValue
    })
      .then((response) => response.data);
  };

  export const postClientCategory = (companyId: string, categodyValue: string, setValue: React.Dispatch<React.SetStateAction<string>>) :thunkType => (dispatch) => {
    dispatch(getClientCategoryRequested());
    postClientCategoryRequest(companyId, categodyValue)
      .then((data) => { 
        message.success('Новая категория добавлена.')
        setValue('')
        dispatch(postClientCategorySuccess(data))
      })
      .catch((err) => {
        getClientCategoryError(err.response.data.message);
        message.error(`Новая категория не добавлена. ${err.response.data.message}`);
      });
  };
//--------------

// Удаление категорий клиентов
const deleteClientCategorySuccess = (item: categoryClientType[]) => ({
  type: CLIENTS_CATEGORY_DELETE_SUCCESS,
  payload: item,
});

const deleteClientCategoryRequest = async (categoryId: string, companyId: string) => {
  return axios.delete('company/client/category', {
    params: {
      categoryId,
      companyId
    }
  })
    .then((response) => response.data);
};

export const deleteClientCategory = (categoryId: string, companyId: string, setOpenS: React.Dispatch<React.SetStateAction<boolean>>) :thunkType => (dispatch) => {
  dispatch(getClientCategoryRequested());
  deleteClientCategoryRequest(categoryId, companyId)
    .then((data) => { 
      message.success('Категория успешно удаленна.')
      setOpenS(false)
      dispatch(deleteClientCategorySuccess(data))
    })
    .catch((err) => {
      dispatch(getClientCategoryError(err.response.data.message));
      message.error('Ошибка, текущая категория все еще является используемой для других клиентов.')
    });
};
//--------------

// Изменение категорий клиентов
const putClientCategorySuccess = (item: clientsType) => ({
  type: CLIENTS_CATEGORY_PUT_SUCCESS,
  payload: item,
});

const putClientCategoryRequest = async (categoryId: string, id: string) => {
  return axios.put('company/client/category', {
    id,
    categoryId
  })
    .then((response) => response.data);
};

export const putClientCategory = (categoryId: string, id: string, setValue: React.Dispatch<React.SetStateAction<string>>) :thunkType => (dispatch) => {
  dispatch(getClientCategoryRequested());
  putClientCategoryRequest(categoryId, id)
    .then((data) => {
      setValue(data?.clientsCategory?.value)
      message.success('Категория успешно изменена.')
      dispatch(putClientCategorySuccess(data))
    })
    .catch((err) => { 
      dispatch(getClientCategoryError(err.response.data.message));
      message.error(`Ошибка, категория не изменена. ${err.response.data.message}`)
    });
};
//-------------- 