import axios from 'axios';

//Constant global key name used to get access token from local storage
export const JWT_KEY = 'access_token';

//Base axios instance all outgoing api requests will use
export const instance = axios.create();

/**
 * Request interceptor for all outgoing requests
 * This interceptor gets the access token from localStorage and attaches it to the Authorization Header
 */
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(JWT_KEY);
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
