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
            <img src={project.logo} className={`sm:h-48 w-full sm:w-48 area-image`}/>
            <h4 className={`font-semibold area-name`}>{project.name}</h4>
            <div className={`text-gray-600 dark:text-dark-400 mb-1 area-authors`}>
                                        <span>
                                            {`by `}
                                        </span>
                {listContributors(project)}
            </div>
            <p className={`area-summary`}>
                {project.summary}
            </p>
            <p className={`area-id`}>
                {`ProjectID: ${project.id}`}
            </p>
            <p className={`area-created`}>
                {`Created at: ${moment.utc(project.createdAt).format("MM/DD/YYYY")}`}
            </p>
            <p className={`area-updated`}>
                {`Updated at: ${moment.utc(project.updatedAt).format("MM/DD/YYYY")}`}
            </p>
            <p className={`area-downloads`}>
                {`${project.id} Downloads`}
            </p>
            <div className={`grid my-auto gap-2 area-tags grid-cols-tags`}>
                {project.tags.map(value => <DisplayTag tagName={value.name} tagSlug={value.slug} key={value.slug}/>)}
            </div>

        </div>
        <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info`}>
            <div className={`px-2 pb-1 -mb-0.125 border-b-2  ${isDescription() ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
                {isDescription() ? <span className={`cursor-default select-none text-diluv-600`}>Description</span> :
                    <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/`}
                          as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/`}>

                        <a>
                            Description
                        </a>

                    </Link>}

            </div>
            <div className={`px-2 pb-1 -mb-0.125 border-b-2 ${isFiles() ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
                {isFiles() ? <span className={`cursor-default select-none text-diluv-600`}>Files</span> :
                    <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files`}
                          as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}>

                        <a>
                            Files
                        </a>

                    </Link>}
            </div>
            <div className={`px-2 pb-1 -mb-0.125 border-b-2 ${isMembers() ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
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
