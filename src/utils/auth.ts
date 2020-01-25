import {destroyCookie, parseCookies, setCookie} from "nookies";
import jwt from "jwt-decode";
import {useRouter} from "next/router";
import {NextPageContext} from "next";
import {useEffect} from "react";
import axios from "axios";
import {API_URL} from "./api";


export function clearAuthCookies(ctx: NextPageContext | null | undefined) {
  destroyCookie(ctx, "username");
  destroyCookie(ctx, "accessToken");
  destroyCookie(ctx, "refreshToken");
}

export function hasAccessToken(ctx: NextPageContext | null | undefined) {
  let cookies = parseCookies(ctx);
  return cookies["accessToken"];
}

export function hasValidAccessToken(ctx: NextPageContext | null | undefined) {
  if (!hasAccessToken(ctx)) {
    return false;
  } else {
    let cookies = parseCookies(ctx);
    let token = jwt<{ exp: number }>(cookies["accessToken"]);
    let current_time = new Date().getTime() / 1000;
    return current_time < token.exp;
  }
}

export function refresh(ctx: NextPageContext | null | undefined) {
  let cookies = parseCookies(ctx);
  if (cookies["accessToken"]) {
    let token = jwt<{ exp: number }>(cookies["accessToken"]);
    let current_time = new Date().getTime() / 1000;
    if (current_time > token.exp) {
      if (cookies["refreshToken"]) {
        let refToken = jwt<{ exp: number }>(cookies["refreshToken"]);
        if (current_time > refToken.exp) {
          clearAuthCookies(ctx);
        } else {
          axios.post(API_URL + "/v1/auth/refresh", {}, {headers: {
              "Authorization": "Bearer " + cookies["refreshToken"],
              "asd": "dsa"
            }}).then(resp => {
            setCookie(ctx, "accessToken", resp.data.data.accessToken, {
              expires: new Date(resp.data.data.expiredAt)
            });
            setCookie(ctx, "username", jwt<{ username: string }>(resp.data.data.accessToken)["username"], {
              expires: new Date(resp.data.data.expiredAt)
            });
            setCookie(ctx, "refreshToken", resp.data.data.refreshToken, {
              expires: new Date(resp.data.data.refreshExpiredAt)
            });
            return Promise.resolve();
          }).catch(() => {
            clearAuthCookies(ctx);
          })
        }
      } else {
        clearAuthCookies(ctx);
      }
    }
  } else if (cookies["refreshToken"]) {
    let refToken = jwt<{ exp: number }>(cookies["refreshToken"]);
    let current_time = new Date().getTime() / 1000;
    if (current_time > refToken.exp) {
      clearAuthCookies(ctx);
    } else {
      axios.post(API_URL + "/v1/auth/refresh").then(resp => {
        setCookie(ctx, "accessToken", resp.data.data.accessToken, {
          expires: new Date(resp.data.data.expiredAt)
        });
        setCookie(ctx, "username", jwt<{ username: string }>(resp.data.data.accessToken)["username"], {
          expires: new Date(resp.data.data.expiredAt)
        });
        setCookie(ctx, "refreshToken", resp.data.data.refreshToken, {
          expires: new Date(resp.data.data.refreshExpiredAt)
        });
        return Promise.resolve();
      }).catch(() => {
        clearAuthCookies(ctx);
      })
    }
  } else {
    clearAuthCookies(ctx);
  }

}


export function ensureAuthed(ctx: NextPageContext | null | undefined, redirect = "/") {
  const router = useRouter();
  useEffect(() => {
    let cookies = parseCookies(ctx);

    console.log("refreshing");
    console.log(hasValidAccessToken(ctx));
    if (!hasValidAccessToken(ctx)) {

      refresh(ctx);
    }
    console.log(hasValidAccessToken(ctx));
    if(!hasValidAccessToken(ctx)){
      clearAuthCookies(ctx);
      if (redirect) {
        if (ctx && ctx.res) {
          ctx.res.writeHead(401, {
            Location: redirect
          });
          ctx.res.end()
        } else if (router) {
          // @ts-ignore
          router.push(redirect);
        }
      }
    }
    // if (cookies["accessToken"]) {
    //   let token = jwt<{ exp: number }>(cookies["accessToken"]);
    //   let current_time = new Date().getTime() / 1000;
    //   if (current_time > token.exp) {
    //     destroyCookie(ctx, "username");
    //     destroyCookie(ctx, "accessToken");
    //     if (redirect) {
    //       if (ctx && ctx.res) {
    //         ctx.res.writeHead(401, {
    //           Location: redirect
    //         });
    //         ctx.res.end()
    //       } else if (router) {
    //         // @ts-ignore
    //         router.push(redirect);
    //       }
    //     }
    //   }
    // } else {
    //   if (redirect) {
    //     if (ctx && ctx.res) {
    //       ctx.res.writeHead(401, {
    //         Location: redirect
    //       });
    //       ctx.res.end()
    //     } else if (router) {
    //
    //       // @ts-ignore
    //       router.push(redirect);
    //     }
    //   }
    // }

  });

};

