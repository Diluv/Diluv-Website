import React, { Dispatch } from "react";
import { Project, SelectData } from "../../interfaces";
import Link from "next/link";
import { FilterTag } from "../misc/FilterTag";
import HourGlass from "../icons/HourGlass";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import Time from "../icons/Time";
import ChartBar from "../icons/ChartBar";
import { listContributors } from "../../utils/util";
import formatDistance from "date-fns/formatDistance";
import format from "date-fns/format";
import GridArea from "../misc/GridArea";

interface Props {
    gameSlug: string;
    projectTypeSlug: string;
    project: Project;
    setTagFilter: Dispatch<any>;
    tagFilter: SelectData[];
}

function getDownloadsTip(downloads: number): JSX.Element {
    return (
        <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
            <p>{downloads} Downloads</p>
        </div>
    );
}

function getCreatedTip(createdAt: number): JSX.Element {
    return (
        <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
            <p>Created On</p>
            <p>{format(createdAt, "yyyy-MM-dd HH:mm:ss")}</p>
        </div>
    );
}

function getUpdatedTip(updatedAt: number): JSX.Element {
    return (
        <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
            <p>Updated On</p>
            <p>{format(updatedAt, "yyyy-MM-dd HH:mm:ss")}</p>
        </div>
    );
}

function ProjectCard({ gameSlug, projectTypeSlug, project, tagFilter, setTagFilter }: Props): JSX.Element {
    const projectUrlRef = `/games/[GameSlug]/[ProjectType]/[ProjectSlug]`;
    const projectUrl = `/games/${gameSlug}/${projectTypeSlug}/${project.slug}`;
    return (
        <>
            <div className={`grid my-4 w-full mx-auto col-gap-2 row-gap-1 projectCardSmall sm:projectCardMedium lg:projectCardLarge`}>
                <GridArea name={`image`}>
                    <Link href={projectUrlRef} as={projectUrl}>
                        <a>
                            <img src={project.logo} className={`w-32 sm:h-48 sm:w-48 lg:h-32 lg:w-32`} alt={project.name} />
                        </a>
                    </Link>
                </GridArea>

                <GridArea name={`header`} className={"sm:ml-2 leading-snug"}>
                    <Link href={projectUrlRef} as={projectUrl}>
                        <a>
                            <div className={`inline-flex`}>
                                <h4 className={`font-semibold`}>{project.name}</h4>
                            </div>
                        </a>
                    </Link>
                    <div className={`text-gray-600 dark:text-dark-400`}>
                        <span>{`by `}</span>
                        {listContributors(project)}
                    </div>
                </GridArea>

                <GridArea name={`summary`} className={"sm:ml-2 my-auto"}>
                    <div className={`inline-flex`}>
                        <p> {project.summary}</p>
                    </div>
                </GridArea>

                <GridArea name={`downloads`} className={`sm:ml-2 my-auto text-center mr-2`}>
                    <div className={`flex cursor-default`}>
                        <Tippy
                            content={getDownloadsTip(project.downloads)}
                            followCursor={true}
                            plugins={[followCursor]}
                            duration={0}
                            hideOnClick={false}
                        >
                            <div className={`inline-flex`}>
                                <ChartBar className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`} />
                                <span className={`mr-1`}>{project.downloads}</span>
                            </div>
                        </Tippy>
                    </div>
                </GridArea>

                <GridArea name={`created`} className={`sm:ml-2 lg:ml-0 my-auto text-center mr-2`}>
                    <div className={`flex cursor-default`}>
                        <Tippy
                            content={getCreatedTip(project.createdAt)}
                            followCursor={true}
                            plugins={[followCursor]}
                            duration={0}
                            hideOnClick={false}
                        >
                            <div className={`inline-flex`}>
                                <HourGlass className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`} />
                                <span className={``}>{formatDistance(project.createdAt, new Date(), { addSuffix: true })}</span>
                            </div>
                        </Tippy>
                    </div>
                </GridArea>
                <GridArea name={`updated`} className={`sm:ml-2 my-auto text-center mr-2`}>
                    <div className={`flex cursor-default`}>
                        <Tippy
                            content={getUpdatedTip(project.updatedAt)}
                            followCursor={true}
                            plugins={[followCursor]}
                            duration={0}
                            hideOnClick={false}
                        >
                            <div className={`inline-flex`}>
                                <Time className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`} />
                                <span className={``}>{formatDistance(project.updatedAt, new Date(), { addSuffix: true })}</span>
                            </div>
                        </Tippy>
                    </div>
                </GridArea>

                {project.tags.map((value, i) => (
                    <GridArea name={`tag${i + 1}`} className={`sm:ml-2 lg:ml-0 my-auto cursor-default text-center`} key={value.slug}>
                        <FilterTag tagSlug={value.slug} tagName={value.name} tagFilter={tagFilter} setTagFilter={setTagFilter} />
                    </GridArea>
                ))}
            </div>
        </>
    );
}

export default ProjectCard;
