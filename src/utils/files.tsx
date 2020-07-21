import fs from "fs";
import path from "path";

/**
 * Read a file as a string. Silently swallow any errors or exceptions.
 * @param file The file to read.
 */
export function readAsString(file: string): string {
    try {
        return fs.readFileSync(path.join(process.cwd(), file)).toString("utf-8");
    } catch (e) {
        console.log(e);
    }

    return "";
}
