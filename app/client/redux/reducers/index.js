import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
const reducers = {
  products: productReducer,
  cart: cartReducer,
};
export default combineReducers(reducers);
