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
                <Link href={`/author/[Name]/`} as={`/author/${contributor.username}/`}>
                    <a className={"hover:text-diluv-500"}>{contributor.displayName}</a>
                </Link>
                {count !== project.contributors.length && <span className={"mr-1"}>,</span>}
            </span>
        );
    }
    return arr;
}

export function projectHasReleaseStatus(project: Project): boolean {
    return "released" in project;
}

export function projectHasReviewStatus(project: Project): boolean {
    return "review" in project;
}
