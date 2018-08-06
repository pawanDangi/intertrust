import { combineReducers } from 'redux';
import flights from './flights';
import flightType from './flightType';
import searchData from './searchData';

export default combineReducers({
  flights,
  flightType,
  searchData
})