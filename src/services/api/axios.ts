import axios, { AxiosInstance } from 'axios';

import Config from '@config/index';

import { ACCESS_TOKEN_KEY } from '@common/constants';

import { getSecureValue } from '@utils/storage';

const defaultInstance = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authenticatedInstance = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

authenticatedInstance.interceptors.request.use(async (config) => {
  const accessToken = await getSecureValue(ACCESS_TOKEN_KEY);
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export const getInstance = (timeout: number = 10000): AxiosInstance => {
  return axios.create({
    ...defaultInstance.defaults,
    timeout,
  });
};

export const getAuthenticatedInstance = (): AxiosInstance => {
  return authenticatedInstance;
};
