import React, { FocusEvent } from "react";
import { Project } from "../interfaces";
import Link from "next/link";

export function onFocus(setSelectedField: Function, event: FocusEvent<any>) {
    setSelectedField(event.target.id);
}

export function onBlur(setSelectedField: Function) {
    setSelectedField("");
}

export function listContributors(project: Project) {
    let arr = [];
    let count = 0;
    for (let contributor of project.contributors) {
        count++;
        arr.push(<span key={contributor.username}>
        <Link href={`/author/${contributor.username}/`}>
        <a
            className={"hover:text-diluv-500"}>{contributor.username}</a>
            </Link>
            {(count) !== project.contributors.length && <span className={"mr-1"}>,</span>}
        </span>);
    }
    return arr;
}