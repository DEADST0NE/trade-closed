/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

import { API_URL } from '../utils/constants';


export const getAccessToken = (): string =>
  localStorage.getItem('accessToken') || '';

export const getRefreshToken = (): string =>
  localStorage.getItem('refreshToken') || '';

export const setAuthData = ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}): void => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('refreshToken', refreshToken);
};

export const resetAuthData = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isAccessTokenExpired = (): boolean | null => {
  if (getAccessToken()) {
    const decodedToken: {
      exp: number;
    } = jwtDecode(getAccessToken());
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return decodedToken.exp <= currentTime + 10;
  }
  return null;
};

export const refreshTokens = (): Promise<AxiosResponse<any>> => {

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}auth/refreshToken`, {
        refreshToken: getRefreshToken()
      }, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      })
      .then(response => {
        setAuthData(response.data);
        return resolve(response);
      })
      .catch(error => {
        resetAuthData();
        return reject(error);
      });
  });
};