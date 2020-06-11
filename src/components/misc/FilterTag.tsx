import React from "react";
import { SelectData } from "../../interfaces";

export function FilterTag({ tagName, tagSlug, tagFilter, setTagFilter }: { tagName: string, tagSlug: string, tagFilter: SelectData[], setTagFilter: Function }) {
    function hasTag(){
        let hasTag = false;
        for (let data of tagFilter) {
            if (data.value === tagSlug) {
                hasTag = true;
            }
        }
        return hasTag;
    }
    function onClick() {
        let newData = tagFilter;
        if (!hasTag())
            newData = newData.concat({ value: tagSlug, label: tagName });
        setTagFilter(newData);
    }

    return <div className={`inline flex cursor-pointer px-2 align-middle ${!hasTag() ? `bg-hsl-100` : `bg-tag`} hover:bg-tag text-hsl-800`} onClick={onClick}>
        <span>{tagName}</span>

    </div>;
}


export function DisplayTag({ tagName, tagSlug }: { tagName: string, tagSlug: string }) {
    return <div className={`inline flex cursor-default px-2 align-middle bg-hsl-100 hover:bg-tag text-hsl-800`}>
        <span>{tagName}</span>

    </div>;
}