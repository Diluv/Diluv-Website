import { Session, signIn } from "next-auth/client";
import { useEffect } from "react";

export function ensureAuthed(session?: Session | null): void {
    useEffect(() => {
        if (!session) {
            signIn("DILUV");
        }
    }, [session]);
}