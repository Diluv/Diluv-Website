import React from "react";
import { Project } from "../../interfaces";
import Link from "next/link";
import { DisplayTag } from "../misc/FilterTag";
import { canEditProject, listContributors, projectHasReleaseStatus, projectHasReviewStatus } from "../../utils/util";
import Alert from "../Alert";
import Download from "../icons/Download";
import GridArea from "../misc/GridArea";
import { FormattedTime } from "../../utils/dynamic";
// @ts-ignore

export default function ProjectInfo({ project, pageType }: { project: Project; pageType: string }): JSX.Element {
    function isDescription(): boolean {
        return pageType === "description";
    }

    function isFiles(): boolean {
        return pageType === "files";
    }

    function isMembers(): boolean {
        return pageType === "members";
    }

    function isSettings(): boolean {
        return pageType === "settings";
    }

    return (
        <div id={"topInfo"}>
            {projectHasReleaseStatus(project) && !project.review ? (
                <Alert type={"warning"} className={`my-4`}>
                    This project is under review and only people with permission can see it!
                </Alert>
            ) : (
                <></>
            )}
            {projectHasReviewStatus(project) && !project.released ? (
                <Alert type={"warning"} className={`my-4`}>
                    This project is not released yet!
                </Alert>
            ) : (
                <></>
            )}

            <div className={`grid mt-4 mb-4 sm:gap-x-4 justify-center sm:justify-start projectInfoSmall sm:projectInfoMedium`}>
                <GridArea name={`image`}>
                    <img src={project.logo} className={`sm:h-56 w-full sm:w-56`} alt={project.name} />
                </GridArea>
                <GridArea name={`projectInfo`}>
                    <div className={`leading-tight mt-2 sm:mt-0`}>
                        <h4 className={`font-semibold`}>{project.name}</h4>

                        <div className={`text-gray-600 dark:text-dark-400`}>
                            <span>{`by `}</span>
                            {listContributors(project)}
                        </div>
                    </div>

                    <p className={`my-1`}>
                        Project Type:
                        <Link href={`/games/[Gameslug]/[ProjectType]/`} as={`/games/${project.game.slug}/${project.projectType.slug}`}>
                            <a className={"ml-1 hover:text-diluv-500"}>{project.projectType.name}</a>
                        </Link>
                    </p>
                </GridArea>
                <GridArea name={`summary`}>
                    <p>{project.summary}</p>
                </GridArea>
                <GridArea name={`id`}>
                    <p>{`ProjectID: ${project.id}`}</p>
                </GridArea>
                <GridArea name={`created`}>
                    <FormattedTime time={project.createdAt} prefix={`Created at:`} />
                </GridArea>
                <GridArea name={`updated`}>
                    <FormattedTime time={project.updatedAt} prefix={`Updated at:`} />
                </GridArea>
                <GridArea name={`downloads`}>
                    <p>{`${project.downloads} Downloads`}</p>
                </GridArea>
                <GridArea name={`tags`} className={`grid my-auto gap-2 grid-cols-tags`}>
                    {project.tags.map((value) => (
                        <DisplayTag tagName={value.name} tagSlug={value.slug} key={value.slug} />
                    ))}
                </GridArea>
            </div>
            <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info mt-4`}>
                {isDescription() ? (
                    <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                        <span className={`cursor-default select-none text-diluv-600`}>Description</span>
                    </div>
                ) : (
                    <Link
                        href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/`}
                        as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/`}
                    >
                        <a>
                            <div className={`px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}>
                                Description
                            </div>
                        </a>
                    </Link>
                )}

                {isFiles() ? (
                    <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                        <span className={`cursor-default select-none text-diluv-600`}>Files</span>
                    </div>
                ) : (
                    <Link
                        href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files`}
                        as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}
                    >
                        <a>
                            <div className={`px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}>
                                Files
                            </div>
                        </a>
                    </Link>
                )}

                {isMembers() ? (
                    <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                        <span className={`cursor-default select-none text-diluv-600`}>Members</span>
                    </div>
                ) : (
                    <Link
                        href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/members`}
                        as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}
                    >
                        <a>
                            <div className={`px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}>
                                Members
                            </div>
                        </a>
                    </Link>
                )}

                {canEditProject(project) ? (
                    isSettings() ? (
                        <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-amber-500 hover:border-amber-500 col-start-5`}>
                            <span className={`cursor-default select-none text-amber-600`}>Settings</span>
                        </div>
                    ) : (
                        <Link
                            href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/settings`}
                            as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`}
                        >
                            <a className={`col-start-5`}>
                                <div
                                    className={`px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-amber-300 dark-hover:border-amber-700`}
                                >
                                    Settings
                                </div>
                            </a>
                        </Link>
                    )
                ) : (
                    <> </>
                )}
            </div>
        </div>
    );
}
