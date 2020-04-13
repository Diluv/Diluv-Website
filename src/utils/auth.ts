import { destroyCookie, parseCookies, setCookie } from 'nookies';
import jwt from 'jwt-decode';
import { NextPageContext } from 'next';
import axios from 'axios';
import { API_URL } from './api';
import dynamic from "next/dynamic";

export const Auth = dynamic(() => import("../components/auth/Auth"), {
  ssr: false,
});

export function clearAuthCookies(ctx: NextPageContext | null | undefined) {
  destroyCookie(ctx, 'username');
  destroyCookie(ctx, 'accessToken');
  destroyCookie(ctx, 'refreshToken');
}

export function getAccessToken(ctx: NextPageContext | null | undefined) {
  const cookies = parseCookies(ctx);
  return cookies.accessToken;
}

export function getRefreshToken(ctx: NextPageContext | null | undefined) {
  const cookies = parseCookies(ctx);
  return cookies.refreshToken;
}

export function hasValidAccessToken(ctx: NextPageContext | null | undefined) {
  if (!getAccessToken(ctx)) {
    return false;
  }
  const cookies = parseCookies(ctx);
  const token = jwt<{ exp: number }>(cookies.accessToken);
  const currentTime = new Date().getTime() / 1000;
  return currentTime < token.exp;
}

export function hasValidRefreshToken(ctx: NextPageContext | null | undefined) {
  if (!getRefreshToken(ctx)) {
    return false;
  }
  const cookies = parseCookies(ctx);
  const token = jwt<{ exp: number }>(cookies.refreshToken);
  const currentTime = new Date().getTime() / 1000;
  return currentTime < token.exp;
}

export async function refresh(ctx: NextPageContext | null | undefined) {
  // You can have a valid access token, but an invalid refresh token
  if (hasValidAccessToken(ctx) && hasValidRefreshToken(ctx)) {
    // Don't refresh if we don't need to
    return Promise.resolve(true);
  }
  if (hasValidRefreshToken(ctx)) {
    const refreshToken = getRefreshToken(ctx);
    const refreshed = await axios.post(`${API_URL}/v1/auth/refresh`, {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }).then((resp) => {
      setCookie(ctx, 'accessToken', resp.data.data.accessToken, {
        expires: new Date(resp.data.data.expiredAt),
      });
      setCookie(ctx, 'username', jwt<{ username: string }>(resp.data.data.accessToken).username, {
        expires: new Date(resp.data.data.expiredAt),
      });
      setCookie(ctx, 'refreshToken', resp.data.data.refreshToken, {
        expires: new Date(resp.data.data.refreshExpiredAt),
      });
      // We got a valid reply, cookies have been refreshed
      return Promise.resolve(true);
    }).catch(() => {
      /*
      Error while refreshing, clear cookies
      (TODO this could be caused by the server being unreachable
         or from other issues such as invalid refresh tokens)
       */
      clearAuthCookies(ctx);
      return Promise.resolve(false);
    });
    return Promise.resolve(refreshed);
  }
  // If there is no refresh token, We can't refresh, clear the specific cookies
  clearAuthCookies(ctx);
  return Promise.resolve(false);
}

// TODO pages like login need "requireNotAuthed" just a matter of where to direct the user
export function requireAuth(ctx: NextPageContext, redirectUrl = '/login') {
  let url = '';
  if (ctx.req && ctx.req.url) {
    url = `?rt=${ctx.req.url}`;
  }

  return refresh(ctx).then((refreshed): Promise<{}> | any => {
    if (refreshed) {
      return Promise.resolve({});
    }
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: redirectUrl + url,
      });
      return Promise.resolve(ctx.res.end());
    }
    return Promise.resolve({});
  }).catch(() => Promise.resolve({}));
}

export function privateProps(ctx: NextPageContext) {
  return requireAuth(ctx);
}
