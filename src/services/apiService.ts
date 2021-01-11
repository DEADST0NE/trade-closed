/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { API_URL } from '../utils/constants'
import * as authService from './authService';

const instance = axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });

  failedQueue = [];
};

instance.interceptors.request.use(
  async request => {
    if (authService.isAccessTokenExpired()) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            request.headers.Authorization = `Bearer ${token}`;
            return request;
          })
          .catch(error => Promise.reject(error));
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        authService
          .refreshTokens()
          .then(response => {
            request.headers.Authorization = `Bearer ${response.data.token}`;
            processQueue(null, response.data.token);
            resolve(request);
          })
          .catch(error => {
            processQueue(error, null);
            reject(error);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    request.headers.Authorization = `Bearer ${authService.getAccessToken()}`;
    return request;
  },
  error => Promise.reject(error),
);

export default instance;