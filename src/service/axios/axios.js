import axios from "axios";
import { getLocaleStorage } from "../../base/base";

const https = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NiIsIkhldEhhblN0cmluZyI6IjAzLzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMjEwMjQwMDAwMCIsIm5iZiI6MTY4MzMwNjAwMCwiZXhwIjoxNzEyMjUwMDAwfQ.YeDhc_oSixV2XtFPDzcpxFhBos5832JpQpndHNoqZLk",
  },
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let account = getLocaleStorage("User");
    if (account?.accessToken !== null) {
      config.headers.Authorization = "Bearer " + account?.accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default https;
