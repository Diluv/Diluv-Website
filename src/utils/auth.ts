import { ServerResponse } from "http";
import { Session } from "./api";

export function ensureAuthed(session: Session | null | undefined, res: ServerResponse, url: string): boolean {
    if (!session) {
        res.writeHead(302, {
            "Location": url,
            "Content-Type": "text/html; charset=utf-8"
        });
        res.end();
        return false;
    }

    return true;
}