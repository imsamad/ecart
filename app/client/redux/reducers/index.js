import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import snackReducer from './snackReducer';
import orderReducer from './orderReducer';
import orderPayReducer from './orderPayReducer';
import profileReducer from './profileReducer';
import myOrdersReducer from './myOrdersReducer';
const reducers = {
  products: productReducer,
  cart: cartReducer,
  snack: snackReducer,
  order: orderReducer,
  orderPay: orderPayReducer,
  profile: profileReducer,
  myOrders: myOrdersReducer,
};
export default combineReducers(reducers);
