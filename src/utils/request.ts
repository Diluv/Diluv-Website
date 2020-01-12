import axios from 'axios';
import {destroyCookie, parseCookies, setCookie} from 'nookies';
import jwt from 'jwt-decode'
import {API_URL} from "./api";

export function post(url: string, data: any, headers: any = {
  'Accept': 'application/json'
}) {
  if (process.browser) {
    let token = parseCookies(null)["accessToken"];
    if (!headers.Authorization && token) {
      let jwtToken = jwt<{ exp: number }>(token);
      let current_time = new Date().getTime() / 1000;
      if (current_time > jwtToken.exp) {
        refresh(); // Should put new things into the cookie
        token = parseCookies(null)["accessToken"];
        if (token) {
          headers.Authorization = "Bearer " + token
        }
      } else {
        headers.Authorization = "Bearer " + token
      }
    }
  }
  return axios.post(url, data, {
    headers: headers
  })
}

export function refresh() {
  let accessToken = parseCookies(null)["accessToken"];
  if (!accessToken) {
    return;
  }
  let jwtToken = jwt<{ exp: number }>(accessToken);
  let current_time = new Date().getTime() / 1000;
  if (current_time < jwtToken.exp) {
    return;
  }
  let refreshToken = parseCookies(null)["refreshToken"];
  if (!refreshToken) {
    return;
  }

  axios.post(API_URL + "/v1/auth/refresh", {}, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': "Bearer " + refreshToken
    }
  }).then(value => {
    setCookie(null, "accessToken", value.data.data.accessToken, {
      expires: new Date(value.data.data.expiredAt)
    });
    setCookie(null, "username", jwt<{ username: string }>(value.data.data.accessToken)["username"], {
      expires: new Date(value.data.data.expiredAt)
    });
    setCookie(null, "refreshToken", value.data.data.refreshToken, {
      expires: new Date(value.data.data.refreshExpiredAt)
    });
  }).catch(() => {
    // If refresh failed, essentially log user out
    destroyCookie(null, "accessToken");
    destroyCookie(null, "username");
    destroyCookie(null, "refreshToken");

  })
}

