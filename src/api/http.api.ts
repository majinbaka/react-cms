import axios from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from '@app/api/ApiError';
import { deleteRefreshToken, deleteToken, deleteUser, persistRefreshToken, persistToken, readRefreshToken, readToken } from '@app/services/localStorage.service';

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

httpApi.interceptors.request.use((config) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${readToken()}` };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  throw new ApiError<ApiErrorData>(error.response?.data.message || error.message, error.response?.data);
});

httpApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== `auth/login` && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await httpApi.post(`auth/token`, {
            refreshToken: readRefreshToken(),
          });
          const { accessToken, refreshToken } = rs.data.data;
          persistToken(accessToken);
          persistRefreshToken(refreshToken);

          return httpApi(originalConfig);
        } catch (_error) {
          deleteToken();
          deleteRefreshToken();
          deleteUser();
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

export interface ApiErrorData {
  message: string;
}
