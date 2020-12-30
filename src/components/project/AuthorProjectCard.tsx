import React from "react";
import { Project } from "../../interfaces";
import Link from "next/link";
import { DisplayTag } from "../misc/FilterTag";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import Time from "../icons/Time";
import ChartBar from "../icons/ChartBar";
import { listContributors } from "../../utils/util";
import GridArea from "../misc/GridArea";
import { FormattedDistanceTime, FormattedTime } from "../../utils/dynamic";
import Calendar from "../icons/Calendar";
import Image from "next/image";

interface Props {
    project: Project;
}

function getDownloadsTip(downloads: number) {
    return (
        <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
            <p>{downloads} Downloads</p>
        </div>
    );
}

function getCreatedTip(createdAt: number) {
    return (
        <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
            <p>Created On</p>
            <FormattedTime time={createdAt} />
        </div>
    );
}

function getUpdatedTip(updatedAt: number) {
    return (
        <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
            <p>Updated On</p>
            <FormattedTime time={updatedAt} />
        </div>
    );
}

function AuthorProjectCard({ project }: Props): JSX.Element {
    const projectUrl = `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}`;
    return (
        <>
            <div className={`grid my-3 w-full mx-auto gap-x-2 gap-y-1 projectCardSmall sm:projectCardMedium lg:projectCardLarge`}>
                <GridArea name={`image`}>
                    <Link href={projectUrl}>
                        <a>
                            <div className={`w-32 h-32 sm:h-48 sm:w-48 lg:h-32 lg:w-32`}>
                                <Image src={project.logo} alt={project.name} width={128} height={128} layout={`responsive`} />
                            </div>
                        </a>
                    </Link>
                </GridArea>

                <GridArea name={`header`} className={"sm:ml-2 leading-snug"}>
                    <Link href={projectUrl}>
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
                                <Calendar className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`} />
                                <FormattedDistanceTime start={project.createdAt} />
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
                                <FormattedDistanceTime start={project.updatedAt} />
                            </div>
                        </Tippy>
                    </div>
                </GridArea>

                {project.tags.map((value, i) => (
                    <GridArea name={`tag${i + 1}`} className={`sm:ml-2 lg:ml-0 my-auto cursor-default text-center}`} key={value.slug}>
                        <DisplayTag tagSlug={value.slug} tagName={value.name} />
                    </GridArea>
                ))}
            </div>
        </>
    );
}

export default AuthorProjectCard;
