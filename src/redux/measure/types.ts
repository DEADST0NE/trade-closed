import {
  MEASURE_GET_REQUEST, 
  MEASURE_GET_SUCCESS,
  MEASURE_GET_ERROR,
} from '../actions';

export interface errorType {
  message: string,
}

export interface dictionaryType {
  value: number;
  label: string;
}

export type initStateType = {
  measures: dictionaryType[];
  loading: boolean;
  error: errorType | null;
} 

interface measuresGetErrorType {
  type: typeof MEASURE_GET_ERROR;
  payload: errorType
}
interface measuresGetSuccessType {
  type: typeof MEASURE_GET_SUCCESS;
  payload: dictionaryType[]
}
interface measuresGetRequestType {
  type: typeof MEASURE_GET_REQUEST;
}

export type MeasuresActionsType =
  | measuresGetErrorType
  | measuresGetSuccessType
  | measuresGetRequestType;