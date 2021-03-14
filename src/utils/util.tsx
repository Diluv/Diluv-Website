import React, { Dispatch, FocusEvent, ReactNode } from "react";
import { Project } from "../interfaces";
import Link from "next/link";

export function onFocus(setSelectedField: Dispatch<string>, event: FocusEvent<any>): void {
    setSelectedField(event.target.id);
}

export function onBlur(setSelectedField: Dispatch<string>): void {
    setSelectedField("");
}

export function listContributors(project: Project): ReactNode[] {
    const arr: ReactNode[] = [];
    let count = 0;
    for (const contributor of project.contributors) {
        count++;
        arr.push(
            <span key={contributor.username}>
                <Link href={`/author/${contributor.username}/`}>
                    <a className={"hover:text-diluv-500"}>{contributor.displayName}</a>
                </Link>
                {count !== project.contributors.length && <span className={"mr-1"}>,</span>}
            </span>
        );
    }
    return arr;
}

export function projectHasReleaseStatus(project: Project): boolean {
    return Object.keys(project).includes("released");
}

export function projectHasReviewStatus(project: Project): boolean {
    return Object.keys(project).includes("review");
}

export function canEditProject(project: Project): boolean {
    if (project.permissions) {
        return project.permissions.indexOf("project.edit") >= 0;
    }
    return false;
}

export function canUploadFile(project: Project): boolean {
    if (project.permissions) {
        return project.permissions.indexOf("file.upload") >= 0;
    }
    return false;
}

export function canEditFile(project: Project): boolean {
    if (project.permissions) {
        return project.permissions.indexOf("file.edit") >= 0;
    }
    return false;
}

export function onLoadAsync(obj: HTMLImageElement): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}

export function readUploadedFileAsText(inputFile: File): Promise<string | ArrayBuffer | null> {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile);
    });
}
