import { ServerResponse } from "http";
import { Session } from "next-auth";

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

export function getNameOrDefault(session: Session | null | undefined, defaultName: string): string {
    return session ? (session.user.name as string) : defaultName;
}
