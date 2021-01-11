import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const developmentStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

const productionStore = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

const store =
  process.env.NODE_ENV !== 'production' ? developmentStore : productionStore;

export default store;