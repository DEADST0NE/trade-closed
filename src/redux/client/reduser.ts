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
  CLIENTS_CATEGORY_PUT_SUCCESS
} from '../actions';

import { initStateType, StagesActionsType } from './types'

const INIT_STATE: initStateType = {
  clients: [],
  loading: false,
  error: null,
  categoryClient: [],
  categoryClientLoading: false,
  categoryClientError: null,
  searchClient: [],
  searchClientLoadung: false,
};

const reducer = (state = INIT_STATE, action: StagesActionsType): initStateType => {
  switch (action.type) {
  // Список клиентов
    case CLIENTS_GET_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case CLIENTS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CLIENTS_GET_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        loading: false,
        error: null,
      };
  // Добавление клиента к компании
    case CLIENTS_POST_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case CLIENTS_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CLIENTS_POST_SUCCESS:
      state.clients.push(action.payload);
      return {
        ...state, 
        loading: false,
        error: null,
      };
  // Удаления клиента из компании
    case CLIENTS_DELETE_ERROR:
      return {
        ...state,
        loading: false, 
        error: action.payload,
      };

    case CLIENTS_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CLIENTS_DELETE_SUCCESS: 
      return {
        ...state,
        clients: action.payload,
        loading: false,
        error: null,
      };
  // Поиск клиента
    case CLIENTS_SEARCH_GET_SUCCESS:
      return {
        ...state,
        searchClient: action.payload,
        searchClientLoadung: false,
      };
    case CLIENTS_SEARCH_GET_REQUEST:
      return {
        ...state,
        searchClientLoadung: true,
      };
    case CLIENTS_SEARCH_GET_ERROR:
      return {
        ...state,
        searchClient: [],
        searchClientLoadung: false,
      };
  // Получение списка категорий клиентов
    case CLIENTS_CATEGORY_GET_ERROR:
      return {
        ...state,
        categoryClientLoading: false, 
        categoryClientError: action.payload,
      };

    case CLIENTS_CATEGORY_GET_REQUEST:
      return {
        ...state,
        categoryClientLoading: true,
        categoryClientError: null,
      };

    case CLIENTS_CATEGORY_GET_SUCCESS:
      return {
        ...state,
        categoryClient: action.payload,
        categoryClientLoading: false,
        categoryClientError: null,
      };
  // Добавление категорий клиентов
    case CLIENTS_CATEGORY_POST_SUCCESS: 
      state.categoryClient.push(action.payload);
      return {
        ...state,
        categoryClientLoading: false,
        categoryClientError: null,
      };
  // Удаление категорий клиентов
    case CLIENTS_CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        categoryClient: action.payload,
        categoryClientLoading: false,
        categoryClientError: null,
      };
  // Измения категории у клиента
    case CLIENTS_CATEGORY_PUT_SUCCESS: 
      return {
        ...state,
        clients: state.clients.map(item => item.key ===  action.payload.key ? action.payload : item),
        categoryClientLoading: false,
        categoryClientError: null,
      }; 
    
    default:
      return state;
  }
};

export default reducer;