import React, { Dispatch } from "react";
import { SelectData } from "interfaces";

export function FilterTag({
    tagName,
    tagSlug,
    tagFilter,
    setTagFilter
}: {
    tagName: string;
    tagSlug: string;
    tagFilter: SelectData[];
    setTagFilter: Dispatch<any>;
}): JSX.Element {
    function hasTag() {
        let hasTag = false;
        for (const data of tagFilter) {
            if (data.value === tagSlug) {
                hasTag = true;
            }
        }
        return hasTag;
    }

    function onClick() {
        let newData = tagFilter;
        if (!hasTag()) newData = newData.concat({ value: tagSlug, label: tagName });
        setTagFilter(newData);
    }

    return (
        <div
            className={`inline flex cursor-pointer px-2 align-middle text-hsl-800 dark:text-dark-100 ${
                !hasTag() ? `bg-hsl-100 dark:bg-hsl-800` : `bg-tag dark:bg-tag-dark`
            } hover:bg-tag dark:hover:bg-tag-dark`}
            onClick={onClick}
        >
            <span>{tagName}</span>
        </div>
    );
}

export function DisplayTag({ tagName, tagSlug }: { tagName: string; tagSlug: string }): JSX.Element {
    return (
        <div
            className={`inline flex cursor-default px-2 align-middle bg-hsl-100 dark:bg-hsl-800 hover:bg-tag dark:hover:bg-tag-dark text-hsl-800 dark:text-dark-100 `}
        >
            <span>{tagName}</span>
        </div>
    );
}
