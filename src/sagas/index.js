import { spawn } from 'redux-saga/effects';
import watchGetWeatherDetails from '../sagas/getWeatherDetails';

/**
 * @description - Core saga function.
 */
export default function* rootSaga() {
  yield 'RootSaga';
  yield spawn(watchGetWeatherDetails);
}
