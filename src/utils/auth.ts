import { Session } from "../interfaces";
// @ts-ignore
import { signin } from "next-auth/client";
import { useEffect, useLayoutEffect } from "react";

export function ensureAuthed(session?: Session) {
    useEffect(() => {
        if (!session) {
            signin("DILUV");
        }
    }, [session]);
}
