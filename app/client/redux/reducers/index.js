import { combineReducers } from 'redux';
import productReducer from './productReducer';
const reducers = {
  productsList: productReducer,
};
export default combineReducers(reducers);
