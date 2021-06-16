import AwaitTo from "async-await-error-handling";
import Axios from "axios";

class API {
  static async get({ url, queryParams, headers }) {
    const config = {
      params: queryParams,
      headers,
    };
    const [err, response] = await AwaitTo(Axios.get(url, config));
    if (err) {
      if (err.response) {
        return {
          ...err.response.data,
        };
      }
      return {
        message: "server error",
        status: 500,
      };
    }
    return {
      ...response.data,
    };
  }

  static async post({ url, queryParams, data, headers }) {
    const config = {
      params: queryParams,
      headers,
    };
    const [err, response] = await AwaitTo(Axios.post(url, data, config));
    if (err) {
      if (err.response) {
        return {
          ...err.response.data,
        };
      }
      return {
        message: "server error",
        status: 500,
      };
    }
    return {
      ...response.data,
    };
  }

  static async put({ url = "", queryParams = {}, data = {}, headers = {} }) {
    const config = {
      params: queryParams,
      headers,
    };

    const [err, response] = await AwaitTo(Axios.put(url, data, config));
    if (err) {
      if (err.response) {
        return {
          ...err.response.data,
        };
      }
      return {
        message: "server error",
        status: 500,
      };
    }
    return {
      ...response.data,
    };
  }

  static async delete({ url = "", queryParams = {}, headers = {}, data = {} }) {
    const config = {
      params: queryParams,
      headers,
      data,
    };

    const [err, response] = await AwaitTo(Axios.delete(url, config));
    if (err) {
      if (err.response) {
        return {
          ...err.response.data,
        };
      }
      return {
        message: "server error",
        status: 500,
      };
    }
    return {
      ...response.data,
    };
  }
}

export default API;
