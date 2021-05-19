import * as actionTypes from './actionTypes';

/**
 * @description - Function to get weather details.
 * @returns {Object} - Actions type.
 */
export const getWeatherDetails = (data) => ({
  type: actionTypes.WEATHER_DETAILS.GET,
  payload: data,
});

/**
 * @description - Function to save weather detail.
 * @param {Object} data - Payload data.
 * @returns {Object} - Returns type and payload.
 */
export function storeWeatherDetails(data) {
  return {
    type: actionTypes.WEATHER_DETAILS.SUCCESS,
    payload: data,
  };
}

/**
 * @description - Function to clear weather detail.
 * @returns {Object} - Returns type and payload.
 */
export function clearWeatherDetails() {
  return {
    type: actionTypes.WEATHER_DETAILS.CLEAR,
  };
}