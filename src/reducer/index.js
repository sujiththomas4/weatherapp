import { combineReducers } from 'redux';
import weatherDetailsReducer from './weatherDetailsReducer';

/**
 * @description - Core reducers combining all other reducers.
 */
const coreReducer = combineReducers({
  weatherDetailsReducer,
});

export default coreReducer;
