import { combineReducers } from 'redux';

import user from './user/reducer';
import applications from './applications/reducer'
import client from './client/reduser'
import company from './company/reduser'
import product from './product/reduser'
import measures from './measure/reduser'
import category from './category/reduser'
import basket from './basket/reduser'
import manufacture from './manufacture/reduser'

const reducers = combineReducers({
  user,
  applications,
  client,
  company,
  product,
  measures,
  category,
  basket,
  manufacture
});

export type StateType = ReturnType<typeof reducers>;

export default reducers;