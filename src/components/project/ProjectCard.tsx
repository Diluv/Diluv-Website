import React from "react";
import { Project, SelectData } from "../../interfaces";
import Link from "next/link";
import { FilterTag } from "../misc/FilterTag";
import moment from "moment";
import HourGlass from "../icons/HourGlass";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import Time from "../icons/Time";
import ChartBar from "../icons/ChartBar";
import { listContributors } from "../../utils/util";

interface Props {
    gameSlug: string
    projectTypeSlug: string
    project: Project
    setTagFilter: Function
    tagFilter: SelectData[]
}

function ProjectCard({ gameSlug, projectTypeSlug, project, tagFilter, setTagFilter }: Props) {
    let projectUrlRef = `/games/[GameSlug]/[ProjectType]/[ProjectSlug]`;
    let projectUrl = `/games/${gameSlug}/${projectTypeSlug}/${project.slug}`;
    return <>
        <div className={`grid my-4 w-full mx-auto col-gap-2 row-gap-1 projectCardSmall sm:projectCardMedium lg:projectCardLarge`}>
            <div style={{ gridArea: "image" }}>
                <Link href={projectUrlRef} as={projectUrl}>
                    <a>
                        <img src={project.logo} className={`w-32 sm:h-48 sm:w-48 lg:h-32 lg:w-32`}/>
                    </a>
                </Link>
            </div>

            <div className={"sm:ml-2 leading-snug"} style={{ gridArea: "header" }}>
                <Link href={projectUrlRef} as={projectUrl}>
                    <a>
                        <div className={`inline-flex`}>
                            <h4 className={`font-semibold`}>{project.name}</h4>
                        </div>
                    </a>
                </Link>
                <div className={`text-gray-600`}>
                        <span>
                            {`by `}
                        </span>
                    {listContributors(project)}
                </div>
            </div>

            <div className={"sm:ml-2 my-auto"} style={{ gridArea: "summary" }}>
                <div className={`inline-flex`}>
                    <p> {project.summary}</p>
                </div>
            </div>

            <div className={`sm:ml-2 my-auto text-center mr-2`} style={{ gridArea: "downloads" }}>
                <div className={`flex cursor-default`}>
                    <Tippy content={<div className={`bg-gray-800 border border-gray-900 text-white opacity-90 p-1 text-center`}>
                        <p>
                            {project.downloads} Downloads
                        </p>
                    </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>

                        <div className={`inline-flex`}>
                            <ChartBar className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                            <span className={`mr-1`}>
                                {project.downloads}
                            </span>
                        </div>

                    </Tippy>
                </div>
            </div>

            <div className={`sm:ml-2 lg:ml-0 my-auto text-center mr-2`} style={{ gridArea: "created" }}>

                <div className={`flex cursor-default`}>
                    <Tippy content={<div className={`bg-gray-800 border border-gray-900 text-white opacity-90 p-1 text-center`}>
                        <p>
                            Created On
                        </p>
                        <p>{moment(project.createdAt).format("MMMM Do YYYY")}</p>
                    </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                        <div className={`inline-flex`}>
                            <HourGlass className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                            <span className={``}>
                                {moment(project.createdAt).fromNow()}
                            </span>
                        </div>
                    </Tippy>
                </div>

            </div>
            <div className={`sm:ml-2 my-auto text-center mr-2`} style={{ gridArea: "updated" }}>

                <div className={`flex cursor-default`}>
                    <Tippy content={<div className={`bg-gray-800 border border-gray-900 text-white opacity-90 p-1 text-center`}>
                        <p>
                            Updated On
                        </p>
                        <p>{moment(project.updatedAt).format("MMMM Do YYYY")}</p>
                    </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                        <div className={`inline-flex`}>
                            <Time className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                            <span className={``}>
                                {moment(project.updatedAt).fromNow()}
                            </span>
                        </div>
                    </Tippy>
                </div>

            </div>

            {project.tags.map((value, i) => <div className={`sm:ml-2 lg:ml-0 my-auto cursor-default text-center`} key={value.slug}
                                                 style={{ gridArea: `tag${i + 1}` }}>
                <FilterTag tagSlug={value.slug} tagName={value.name} tagFilter={tagFilter}
                           setTagFilter={setTagFilter}/></div>)}


        </div>
    </>;
    ;
}

export default ProjectCard;
