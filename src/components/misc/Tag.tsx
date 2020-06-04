import React from "react";
import { Tag as TagIcon } from "components/icons/Tag";

export default function Tag({ tagName, tagSlug }: { tagName: string, tagSlug: string }) {
    return <div className={`inline flex mx-1`}>
        <TagIcon className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
        <span>{tagName}</span>

    </div>;
}