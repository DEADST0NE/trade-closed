import {
  STAGES_GET_REQUEST,
  STAGES_GET_SUCCESS,
  STAGES_GET_ERROR,
} from '../actions';

export interface errorType {
  message: string,
}

export interface dictionaryType {
  value: number;
  label: string;
}

export type initStateType = {
  dictionary: dictionaryType[];
  dictionaryLoading: boolean;
  dictionaryError: errorType | null;
} 

interface stagesGetErrorType {
  type: typeof STAGES_GET_ERROR;
  payload: errorType
}
interface stagesGetSuccessType {
  type: typeof STAGES_GET_SUCCESS;
  payload: dictionaryType[]
}
interface stagesGetRequestType {
  type: typeof STAGES_GET_REQUEST;
}

export type StagesActionsType =
  | stagesGetErrorType
  | stagesGetSuccessType
  | stagesGetRequestType;