import React, { Dispatch, FocusEvent, ReactNode } from "react";
import { Project } from "interfaces";
import Link from "next/link";
import { GetServerSidePropsResult } from "next";

export function onFocus(setSelectedField: Dispatch<string>, event: FocusEvent<any>): void {
    setSelectedField(event.target.id);
}

export function onBlur(setSelectedField: Dispatch<string>): void {
    setSelectedField("");
}

export function listAuthors(project: Project, includeAuthors: boolean = false): ReactNode[] {
    const arr: ReactNode[] = [];
    let count = 0;

    arr.push(
        <span key={project.owner.username}>
            <Link href={`/author/${project.owner.username}/`}>
                <a className={"hover:text-diluv-500"}>{project.owner.displayName}</a>
            </Link>
            {includeAuthors && project.authors.length > 0 && <span className={"mr-1"}>,</span>}
        </span>
    );

    if (includeAuthors) {
        for (const author of project.authors) {
            count++;
            arr.push(
                <span key={author.username}>
                    <Link href={`/author/${author.username}/`}>
                        <a className={"hover:text-diluv-500"}>{author.displayName}</a>
                    </Link>
                    {count !== project.authors.length && <span className={"mr-1"}>,</span>}
                </span>
            );
        }
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

export function conditionalRedirect(condition: boolean, to: string, permanent: boolean): { shouldRedirect: boolean, redirect: GetServerSidePropsResult<never> } {

    return {
        shouldRedirect: condition, redirect: {
            redirect: {
                destination: to,
                permanent: permanent
            }
        }
    };
}