import { NextRouter } from "next/router";

export function returnTo(router: NextRouter) {
    const urlParams = new URLSearchParams(window.location.search);
    const returningTo = urlParams.get("rt");
    if (returningTo) {
        router.push(returningTo);
    } else {
        router.push("/");
    }
}