import React from "react";
import { Project } from "../../interfaces";
import Link from "next/link";
import { DisplayTag } from "../misc/FilterTag";
import { listContributors } from "../../utils/util";


export default function ProjectInfo({ project, pageType }: { project: Project, pageType: string }) {
    function isDescription(): boolean {
        return pageType === "description";
    }

    function isFiles(): boolean {
        return pageType === "files";
    }

    function isMembers(): boolean {
        return pageType === "members";
    }

    return <div id={"topInfo"}>
        <div className={`grid mt-4 mb-2 gap-4`} style={{ gridTemplateColumns: "12rem 1fr" }}>
            <img src={project.logo} className={`h-48 w-48`}/>
            <div className={`grid grid-rows-3-auto`}>
                <div className={`leading-tight`}>
                    <h4 className={`font-semibold`}>{project.name}</h4>
                    <div className={`text-gray-700 mb-1`}>
                                        <span>
                                            {`by `}
                                        </span>
                        {listContributors(project)}
                    </div>
                </div>
                <div>
                    <p>
                        Project Id
                    </p>
                    <p>
                        Created on
                    </p>
                    <p>
                        updated on
                    </p>
                    <p>
                        Downloads
                    </p>
                </div>
                <div className={`grid my-auto gap-2`} style={{ gridTemplateColumns: "auto auto auto auto 1fr" }}>
                    {project.tags.map(value => <DisplayTag tagName={value.name} tagSlug={value.slug}/>)}
                </div>

            </div>
        </div>
        <div className={`grid border-b-2 border-gray-300`} style={{ gridTemplateColumns: "auto auto auto auto 1fr" }}>
            <div
                className={`px-2 pb-1 -mb-0.125 border-b-2 ${isDescription() ? `border-diluv-500 hover:border-diluv-500` : `hover:border-b-2 hover:border-diluv-300`}`}>
                {isDescription() ? <span className={`cursor-default select-none`}>Description</span> :
                    <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/`}
                          as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/`}>

                        <a>
                            Description
                        </a>

                    </Link>}

            </div>
            <div className={`px-2 pb-1 -mb-0.125 border-b-2 ${isFiles() ? `border-diluv-500 hover:border-diluv-500` : `hover:border-b-2 hover:border-diluv-300`}`}>
                {isFiles() ? <span className={`cursor-default select-none`}>Files</span> :
                    <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files`}
                          as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}>

                        <a>
                            Files
                        </a>

                    </Link>}
            </div>
            <div className={`px-2 pb-1 -mb-0.125 border-b-2 ${isMembers() ? `border-diluv-500 hover:border-diluv-500` : `hover:border-b-2 hover:border-diluv-300`}`}>
                {isMembers() ? <span className={`cursor-default select-none`}>Members</span> :
                    <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/members`}
                          as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}>

                        <a>
                            Members
                        </a>

                    </Link>}
            </div>

        </div>
    </div>;
}
