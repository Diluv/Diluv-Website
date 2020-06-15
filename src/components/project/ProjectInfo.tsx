import React from "react";
import { Project } from "../../interfaces";
import Link from "next/link";
import { DisplayTag } from "../misc/FilterTag";
import { listContributors } from "../../utils/util";
import moment from "moment";


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
        <div className={`grid mt-4 mb-2 sm:col-gap-4 row-gap-1 justify-center sm:justify-start projectInfoSmall sm:projectInfoMedium`}>
            <img src={project.logo} className={`sm:h-48 w-full sm:w-48`} style={{ gridArea: "image" }}/>
            <h4 className={`font-semibold`} style={{ gridArea: "name" }}>{project.name}</h4>
            <div className={`text-gray-700 mb-1`} style={{ gridArea: "authors" }}>
                                        <span>
                                            {`by `}
                                        </span>
                {listContributors(project)}
            </div>
            <p style={{ gridArea: "summary" }}>
                {project.summary}
            </p>
            <p style={{ gridArea: "id" }}>
                {`ProjectID: ${project.id}`}
            </p>
            <p style={{ gridArea: "created" }}>
                {`Created at: ${moment.utc(project.createdAt).format("MM/DD/YYYY")}`}
            </p>
            <p style={{ gridArea: "updated" }}>
                {`Updated at: ${moment.utc(project.updatedAt).format("MM/DD/YYYY")}`}
            </p>
            <p style={{ gridArea: "downloads" }}>
                {`${project.id} Downloads`}
            </p>
            <div className={`grid my-auto gap-2`} style={{ gridTemplateColumns: "auto auto auto auto 1fr", gridArea: "tags" }}>
                {project.tags.map(value => <DisplayTag tagName={value.name} tagSlug={value.slug} key={value.slug}/>)}
            </div>

        </div>
        <div className={`grid border-b-2 border-gray-300`} style={{ gridTemplateColumns: "auto auto auto auto 1fr" }}>
            <div
                className={`px-2 pb-1 -mb-0.125 border-b-2 ${isDescription() ? `border-diluv-500 hover:border-diluv-500` : `hover:border-b-2 hover:border-diluv-300`}`}>
                {isDescription() ? <span className={`cursor-default select-none text-diluv-600`}>Description</span> :
                    <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/`}
                          as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/`}>

                        <a>
                            Description
                        </a>

                    </Link>}

            </div>
            <div className={`px-2 pb-1 -mb-0.125 border-b-2 ${isFiles() ? `border-diluv-500 hover:border-diluv-500` : `hover:border-b-2 hover:border-diluv-300`}`}>
                {isFiles() ? <span className={`cursor-default select-none text-diluv-600`}>Files</span> :
                    <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files`}
                          as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}>

                        <a>
                            Files
                        </a>

                    </Link>}
            </div>
            <div className={`px-2 pb-1 -mb-0.125 border-b-2 ${isMembers() ? `border-diluv-500 hover:border-diluv-500` : `hover:border-b-2 hover:border-diluv-300`}`}>
                {isMembers() ? <span className={`cursor-default select-none text-diluv-600`}>Members</span> :
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
