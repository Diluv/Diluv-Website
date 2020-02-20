import axios from 'axios';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import jwt from 'jwt-decode';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { API_URL } from './api';

function getAccessToken() {
  return parseCookies(null).accessToken;
}

function getRefreshToken() {
  return parseCookies(null).refreshToken;
}

axios.interceptors.request.use((request) => {
  if (!request.headers.Authorization) {
    if (!request.url?.endsWith('v1/auth/refresh')) {
      if (getAccessToken()) {
        request.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
    } else if (getRefreshToken()) {
      request.headers.Authorization = `Bearer ${getRefreshToken()}`;
    }
  }
  return request;
});


// @ts-ignore
const refreshAuthLogic = (failedRequest) => axios.post(`${API_URL}/v1/auth/refresh`).then((tokenRefreshResponse) => {
  setCookie(null, 'accessToken', tokenRefreshResponse.data.data.accessToken, {
    expires: new Date(tokenRefreshResponse.data.data.expiredAt),
  });
  setCookie(null, 'username', jwt<{ username: string }>(tokenRefreshResponse.data.data.accessToken).username, {
    expires: new Date(tokenRefreshResponse.data.data.expiredAt),
  });
  setCookie(null, 'refreshToken', tokenRefreshResponse.data.data.refreshToken, {
    expires: new Date(tokenRefreshResponse.data.data.refreshExpiredAt),
  });
  // eslint-disable-next-line no-param-reassign
  failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.data.accessToken}`;
  return Promise.resolve();
}).catch(() => {
  // If refresh failed, essentially log user out
  destroyCookie(null, 'accessToken');
  destroyCookie(null, 'username');
  destroyCookie(null, 'refreshToken');
});
createAuthRefreshInterceptor(
  axios,
  refreshAuthLogic,
);


export function post(url: string, data: any, headers: any = {
  Accept: 'application/json',
}) {
  return axios.post(url, data, {
    headers,
  });
}

export function get(url: string, headers: any = {
  Accept: 'application/json',
}) {
  return axios.get(url, {
    headers,
  });
}
