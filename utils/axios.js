import axios from "axios";

 const baseURL = "https://clinicsystem.io.vn";

const createAxios = () => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: 5000, // Thời gian chờ tối đa cho yêu cầu (ms)
    headers: {
      "Content-Type": "application/json; charset=utf-8", // Định dạng dữ liệu gửi đi
    },
  });

  const get = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`GET request to ${endpoint} failed: ${error.message}`);
    }
  };

  const getWithData = async (endpoint, data) => {
    try {
      const response = await api.get(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`GET request to ${endpoint} failed: ${error.message}`);
    }
  };

  const post = (endpoint, data) => {
    return api
      .post(endpoint, data)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`POST request to ${endpoint} failed: ${error.message}`);
      });
  };

  const postWithHeaders = (endpoint, data, customHeaders) => {
    return api
      .post(endpoint, data, {
        headers: {
          ...api.defaults.headers,
          ...customHeaders, // Thêm các headers tùy chỉnh ở đây
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`POST request to ${endpoint} failed: ${error.message}`);
      });
  };
  return {
    get,
    getWithData,
    post,
    postWithHeaders
  };
};

export default createAxios;
