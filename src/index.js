import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { updateCustomers } from './actions/customers';
import customerData from './data/smarthost_hotel_guests.json';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

// creating a store for the redux structure
const store = createStore(reducers, applyMiddleware(logger, ReduxPromise));

store.dispatch(updateCustomers({ customers: customerData }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
