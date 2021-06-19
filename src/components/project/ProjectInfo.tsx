import React from "react";
import { Project } from "interfaces";
import Link from "next/link";
import { DisplayTag } from "components/misc/FilterTag";
import { canEditFile, canEditProject, canUploadFile, listContributors, projectHasReleaseStatus, projectHasReviewStatus } from "utils/util";
import Alert from "components/Alert";
import GridArea from "components/misc/GridArea";
import { FormattedTime } from "utils/dynamic";
import Image from "next/image";

export default function ProjectInfo({ project, pageType, fileId }: { project: Project; pageType: string; fileId?: number }): JSX.Element {
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

    function isUploadFile(): boolean {
        return pageType === "uploadFile";
    }

    function isFilePage(): boolean {
        return pageType === "file";
    }

    function isEditFilePage(): boolean {
        return pageType === "editFile";
    }

    return (
        <div id={"topInfo"}>
            {projectHasReviewStatus(project) && project.review ? (
                <Alert type={"alert-warning"} className={`my-4`}>
                    This project is under review and only people with permission can see it!
                </Alert>
            ) : (
                <></>
            )}
            {projectHasReleaseStatus(project) && !project.released ? (
                <Alert type={"alert-warning"} className={`my-4`}>
                    This project is not released yet!
                </Alert>
            ) : (
                <></>
            )}

            <div className={`grid mt-4 mb-4 sm:gap-x-4 justify-center sm:justify-start projectInfo`}>
                <GridArea name={`image`}>
                    <Image
                        src={project.logo}
                        alt={project.name}
                        width={300}
                        height={300}
                        layout={`responsive`}
                        className={`sm:h-56 w-full sm:w-56`}
                    />
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
                        <Link href={`/games/${project.game.slug}/${project.projectType.slug}`}>
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
            <div
                className={`flex flex-col sm:flex-row justify-between border-b-2 border-gray-300 dark:border-dark-700 text-center sm:text-left mt-4`}
            >
                <div className={`flex flex-col sm:flex-row`}>
                    {isDescription() ? (
                        <div className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                            <span className={`cursor-default select-none text-diluv-600`}>Description</span>
                        </div>
                    ) : (
                        <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/`}>
                            <a className={`block`}>
                                <div
                                    className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark:hover:border-diluv-700`}
                                >
                                    Description
                                </div>
                            </a>
                        </Link>
                    )}

                    {isFiles() ? (
                        <div className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                            <span className={`cursor-default select-none text-diluv-600`}>Files</span>
                        </div>
                    ) : (
                        <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}>
                            <a className={`block`}>
                                <div
                                    className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark:hover:border-diluv-700 `}
                                >
                                    Files
                                </div>
                            </a>
                        </Link>
                    )}

                    {isMembers() ? (
                        <div className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                            <span className={`cursor-default select-none text-diluv-600`}>Members</span>
                        </div>
                    ) : (
                        <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}>
                            <a className={`block`}>
                                <div
                                    className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark:hover:border-diluv-700`}
                                >
                                    Members
                                </div>
                            </a>
                        </Link>
                    )}
                </div>

                <div className={`flex flex-col sm:flex-row`}>
                    {canEditFile(project) &&
                    fileId &&
                    (isEditFilePage() ? (
                        <div
                            className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 border-amber-500 hover:border-amber-500 sm:col-start-4 sm:col-end-5`}
                        >
                            <span className={`cursor-default select-none text-amber-600`}>Edit File</span>
                        </div>
                    ) : (
                        <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/${fileId}/edit`}>
                            <a className={`block sm:col-start-5`}>
                                <div
                                    className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-amber-300 dark:hover:border-amber-700`}
                                >
                                    Edit File
                                </div>
                            </a>
                        </Link>
                    ))}

                    {canUploadFile(project) &&
                    (isUploadFile() ? (
                        <div className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 border-amber-500 hover:border-amber-500 sm:col-start-6`}>
                            <span className={`cursor-default select-none text-amber-600`}>Upload File</span>
                        </div>
                    ) : (
                        <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/upload`}>
                            <a className={`block sm:col-start-5`}>
                                <div
                                    className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-amber-300 dark:hover:border-amber-700`}
                                >
                                    Upload File
                                </div>
                            </a>
                        </Link>
                    ))}

                    {canEditProject(project) &&
                    (isSettings() ? (
                        <div className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 border-amber-500 hover:border-amber-500 sm:col-start-7`}>
                            <span className={`cursor-default select-none text-amber-600`}>Settings</span>
                        </div>
                    ) : (
                        <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`}>
                            <a className={`block sm:col-start-6`}>
                                <div
                                    className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-amber-300 dark:hover:border-amber-700`}
                                >
                                    Settings
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
