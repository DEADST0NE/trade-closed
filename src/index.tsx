import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './redux/store';

import './index.scss';
import 'antd/dist/antd.css';


ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider> 
  </StrictMode>,
  document.getElementById('root')
); 