import React, { Dispatch } from "react";
import { Project, SelectData } from "interfaces";
import Link from "next/link";
import { FilterTag } from "components/misc/FilterTag";
import { listAuthors } from "utils/util";
import GridArea from "components/misc/GridArea";
import { FormattedTime } from "utils/dynamic";
import Image from "next/image";
import { CalendarIcon, ChartBarIcon, ClockIcon } from "@heroicons/react/solid";
import FormattedTimeDistance from "../misc/FormattedTimeDistance";
import Tooltip from "../misc/Tooltip";

interface Props {
    gameSlug: string;
    projectTypeSlug: string;
    project: Project;
    setTagFilter: Dispatch<any>;
    tagFilter: SelectData[];
}

function ProjectCard({ gameSlug, projectTypeSlug, project, tagFilter, setTagFilter }: Props): JSX.Element {
    const projectUrl = `/games/${gameSlug}/${projectTypeSlug}/${project.slug}`;
    return (
        <>
            <div className={`grid my-4 w-full mx-auto gap-x-2 gap-y-1 projectCard`}>
                <GridArea name={`image`}>
                    <Link href={projectUrl}>
                        <a>
                            <div className={`w-32 h-32 sm:h-48 sm:w-48 lg:h-32 lg:w-32`}>
                                <Image src={project.logo.sources[0].src} alt={project.name} width={128} height={128} layout={`responsive`} />
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
                        {listAuthors(project, true)}
                    </div>
                </GridArea>

                <GridArea name={`summary`} className={"sm:ml-2 my-auto"}>
                    <div className={`inline-flex`}>
                        <p> {project.summary}</p>
                    </div>
                </GridArea>

                <GridArea name={`downloads`} className={`sm:ml-2 my-auto text-center mr-2`}>
                    <div className={`flex cursor-default`}>
                        <Tooltip id={`${project.id}DownloadsTip`} tooltipContent={`${project.downloads} Downloads`}>
                            <div className={`inline-flex`}>
                                <ChartBarIcon className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`} />
                                <span className={`mr-1`}>{project.downloads}</span>
                            </div>
                        </Tooltip>
                    </div>
                </GridArea>

                <GridArea name={`created`} className={`sm:ml-2 lg:ml-0 my-auto text-center mr-2`}>
                    <div className={`flex cursor-default`}>
                        <Tooltip id={`${project.id}CreatedTip`} tooltipContent={<>
                            <p>Created On</p>
                            <FormattedTime time={project.createdAt} />
                        </>}>
                            <div className={`inline-flex`}>
                                <CalendarIcon className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`} />
                                <FormattedTimeDistance start={project.createdAt} />
                            </div>
                        </Tooltip>
                    </div>
                </GridArea>
                <GridArea name={`updated`} className={`sm:ml-2 my-auto text-center mr-2`}>
                    <div className={`flex cursor-default`}>
                        <Tooltip id={`${project.id}UpdatedTip`} tooltipContent={<>
                            <p>Updated On</p>
                            <FormattedTime time={project.updatedAt} />
                        </>}>
                            <div className={`inline-flex`}>
                                <ClockIcon className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`} />
                                <FormattedTimeDistance start={project.updatedAt} />
                            </div>
                        </Tooltip>
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
