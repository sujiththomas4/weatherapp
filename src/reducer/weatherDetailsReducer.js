import { WEATHER_DETAILS } from '../actions/actionTypes';

const initialState = {
  loading: true,
  error: false,
  data: {},
  errormsg: '',
};
/**
 * @description Reducer for weather details.
 * @param {Object} state - State.
 * @param {Object} action - Action.
 * @returns {Object} State.
 */
const weatherDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_DETAILS.SUCCESS:
      return Object.assign({}, state, {
        loading: true,
        data: action.payload,
        error: false,
        errormsg: "",
      });
    case WEATHER_DETAILS.FAIL:
      return Object.assign({}, state, {
        errormsg: action.message,
        data: {},
        error: true,
        loading: false,
      });
    case WEATHER_DETAILS.CLEAR:
      return Object.assign({}, state, {
        errormsg: "",
        data: {},
        error: false,
        loading: false,
      });
    default:
      return state;
  }
};

export default weatherDetailsReducer;
