import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import snackReducer from './snackReducer';
import orderReducer from './orderReducer';
import orderPayReducer from './orderPayReducer';
const reducers = {
  products: productReducer,
  cart: cartReducer,
  snack: snackReducer,
  order: orderReducer,
  orderPay: orderPayReducer,
};
export default combineReducers(reducers);
