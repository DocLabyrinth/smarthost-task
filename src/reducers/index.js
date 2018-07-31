import { combineReducers } from 'redux';
import rooms from './rooms';
import customers from './customers';

export default combineReducers({
  rooms,
  customers,
});
