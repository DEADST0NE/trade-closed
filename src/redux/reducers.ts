import { combineReducers } from 'redux';

import user from './user/reducer';
import applications from './applications/reducer'
import client from './client/reduser'
import company from './company/reduser'

const reducers = combineReducers({
  user,
  applications,
  client,
  company,
});

export type StateType = ReturnType<typeof reducers>;

export default reducers;