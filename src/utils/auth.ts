import { Session } from "../interfaces";
// @ts-ignore
import { signin } from "next-auth/client";
import { useEffect } from "react";

export function ensureAuthed(session?: Session): void {
    useEffect(() => {
        if (!session) {
            signin("DILUV");
        }
    }, [session]);
}
