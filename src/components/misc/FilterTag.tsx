import React from "react";
import { SelectData } from "../../interfaces";

export function FilterTag({ tagName, tagSlug, tagFilter, setTagFilter }: { tagName: string, tagSlug: string, tagFilter: SelectData[], setTagFilter: Function }) {
    function onClick() {
        let valid = true;
        let newData = tagFilter;
        for (let data of tagFilter) {
            if (data.value === tagSlug) {
                valid = false;
            }
        }
        if (valid)
            newData = newData.concat({ value: tagSlug, label: tagName });
        setTagFilter(newData);
    }

    return <div className={`inline flex cursor-pointer px-2 align-middle bg-hsl-900 hover:bg-tag text-hsl-200`} onClick={onClick}>
        <span>{tagName}</span>

    </div>;
}


export function DisplayTag({ tagName, tagSlug }: { tagName: string, tagSlug: string }) {
    return <div className={`inline flex cursor-default px-2 align-middle bg-hsl-900 hover:bg-tag text-hsl-200`}>
        <span>{tagName}</span>

    </div>;
}