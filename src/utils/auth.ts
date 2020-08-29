// @ts-ignore
import { Session, signIn } from "next-auth/client";
import { useEffect } from "react";

export function ensureAuthed(session?: Session): void {
    useEffect(() => {
        if (!session) {
            signIn("DILUV");
        }
    }, [session]);
}
