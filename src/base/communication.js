/*
        Name : CommunicationService
        Purpose: communication layer for creating service requests
*/
import axios from "axios";

/**
 * @description - Function to stringify json.
 * @param {Object} data - Data.
 * @returns {Object} - Stringified data.
 */
function getstringifiedData(data) {
  return JSON.stringify(data);
}

/**
 * @description - All backend communications are handled here.
 */
export default class Communication {
  /**
   * @description - Constructor to initialize values.
   */
  constructor() {
    this.options = {};
  }

  /**
   * @description - Function to retrieve data from server.
   * @param {string} endpoint - Endpoint.
   * @returns {Promise} - Data obtained from service.
   */
  static getData(endpoint) {
    return axios.get(endpoint);
  }

  /**
   * @description - Function to add data to server
   * @param {string} endpoint - Endpoint.
   * @param {Object} data - Data.
   * @returns {Promise} - Data (receipt) obtained from sever when data has been successfully created.
   */
  static postData(endpoint, data = {}) {
    const postData = getstringifiedData(data);
    return axios.post(endpoint, postData);
  }

  /**
   * @description - Function to Update data to server
   * @param {string} endpoint - Endpoint.
   * @param {Object} data - Data.
   * @returns {Promise} - Data (receipt) obtained from sever when data has been successfully updated.
   */
  static putData(endpoint, data = {}) {
    const postData = getstringifiedData(data);
    return axios.put(endpoint, postData);
  }
}
