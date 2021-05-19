import Communication from '../base/communication';
import { httpMethod } from '../enums/httpMethod';

/**
 * @description - Get request.
 * @param {string} endPoint - Endpont string.
 * @returns {Object} - Data object.
 */
function getRequest(endPoint) {
  return Communication.getData(endPoint)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
}

/**
 * @description - Post request.
 * @param {string} endPoint - Endpont string.
 * @param {Object} param - Param object.
 * @returns {Object} - Data object.
 */
function postRequest(endPoint, param = {}) {
  return Communication.postData(endPoint, param)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
}

/**
 * @description - Put request.
 * @param {string} endPoint - Endpont string.
 * @param {Object} param - Param object.
 * @returns {Object} - Data object.
 */
function putRequest(endPoint, param = {}) {
  return Communication.putData(endPoint, param)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
}

/**
 * @description - Get update request.
 * @param {string} endPoint - Endpont string.
 * @param {Object} param - Params object.
 * @param {Object} method - Method object.
 * @returns {Object} - Data object.
 */
export const fetchAPI = (endPoint, param, method) => {
  switch (method) {
    case httpMethod.GET:
      return getRequest(endPoint);
    case httpMethod.POST:
      return postRequest(endPoint, param);
    case httpMethod.PUT:
      return putRequest(endPoint, param);
    default:
      return getRequest(endPoint);
  }
};

export { fetchAPI as default };
