import {NextRouter} from "next/router";

export function returnTo(router: NextRouter) {
  const urlParams = new URLSearchParams(window.location.search);
  const returningTo = urlParams.get('rt');
  if (returningTo) {
    // @ts-ignore
    router.push(returningTo);
  } else {
    // @ts-ignore
    router.push("/");
  }

}
