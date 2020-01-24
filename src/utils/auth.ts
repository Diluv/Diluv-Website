import {destroyCookie, parseCookies} from "nookies";
import jwt from "jwt-decode";
import { useRouter} from "next/router";
import {NextPageContext} from "next";
import {useEffect} from "react";


export function ensureAuthed(ctx: NextPageContext | null | undefined, redirect = "/") {
  const router = useRouter();
  useEffect(() => {
    let cookies = parseCookies(ctx);

    if (cookies["accessToken"]) {
      let token = jwt<{ exp: number }>(cookies["accessToken"]);
      let current_time = new Date().getTime() / 1000;
      if (current_time > token.exp) {
        destroyCookie(ctx, "username");
        destroyCookie(ctx, "accessToken");
        if (redirect) {
          if (ctx && ctx.res) {
            ctx.res.writeHead(302, {
              Location: redirect
            });
            ctx.res.end()
          } else if (router) {
            // @ts-ignore
            router.push(redirect);
          }
        }
      }
    } else {
      if (redirect) {
        if (ctx && ctx.res) {
          ctx.res.writeHead(302, {
            Location: redirect
          });
          ctx.res.end()
        } else if (router) {

          // @ts-ignore
          router.push(redirect);
        }
      }
    }

  });

};

