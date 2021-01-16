import { combineReducers } from 'redux';

import user from './user/reducer';
import applications from './applications/reducer'
import client from './client/reduser'
import company from './company/reduser'
import product from './product/reduser'
import measures from './measure/reduser'
import category from './category/reduser'

const reducers = combineReducers({
  user,
  applications,
  client,
  company,
  product,
  measures,
  category,
});

export type StateType = ReturnType<typeof reducers>;

export default reducers;