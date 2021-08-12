import React from "react";
import { Project } from "interfaces";
import Link from "next/link";
import { DisplayTag } from "components/misc/FilterTag";
import { canEditFile, canEditProject, canUploadFile, listAuthors, projectHasReleaseStatus, projectHasReviewStatus } from "utils/util";
import Alert from "components/Alert";
import GridArea from "components/misc/GridArea";
import { FormattedTime } from "utils/dynamic";
import Image from "next/image";
import { LineMenu, LineMenuItem } from "../ui/LineMenu";

type pageTypes = "description" | "files" | "members" | "settings" | "uploadFile" | "file" | "editFile";
export default function ProjectInfo({ project, pageType, fileId }: { project: Project; pageType: pageTypes; fileId?: number }): JSX.Element {

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
                        src={project.logo.sources[0].src}
                        alt={project.name}
                        width={300}
                        height={300}
                        layout={`responsive`}
                        className={`sm:h-56 w-full sm:w-56`}
                        priority={true}
                        loading={"eager"}
                    />
                </GridArea>
                <GridArea name={`projectInfo`}>
                    <div className={`leading-tight mt-2 sm:mt-0`}>
                        <h4 className={`font-semibold`}>{project.name}</h4>

                        <div className={`text-gray-600 dark:text-dark-400`}>
                            <span>{`by `}</span>
                            {listAuthors(project, true)}
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
            <LineMenu current={pageType}>
                <LineMenuItem
                    side={"left"}
                    preset={`normal`}
                    itemKey={"description"}
                    href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/`}
                >
                    <span>Description</span>
                </LineMenuItem>
                <LineMenuItem
                    side={"left"}
                    preset={`normal`}
                    itemKey={"files"}
                    href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}
                >
                    <span>Files</span>
                </LineMenuItem>
                <LineMenuItem
                    side={"left"}
                    preset={`normal`}
                    itemKey={"members"}
                    href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}
                >
                    <span>Members</span>
                </LineMenuItem>

                <LineMenuItem
                    side={"right"}
                    preset={`authed`}
                    itemKey={"editFile"}
                    href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/${fileId}/edit`}
                    hidden={!(canEditFile(project) && (typeof fileId === "undefined" && pageType === "file"))}
                >
                    <span>Edit File</span>
                </LineMenuItem>
                <LineMenuItem
                    side={"right"}
                    preset={`authed`}
                    itemKey={"uploadFile"}
                    href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/upload`}
                    hidden={!canUploadFile(project)}
                >
                    <span>Upload File</span>
                </LineMenuItem>
                <LineMenuItem
                    side={"right"}
                    preset={`authed`}
                    itemKey={"settings"}
                    href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`}
                    hidden={!canEditProject(project)}
                >
                    <span>Settings</span>
                </LineMenuItem>
            </LineMenu>
        </div>
    );
}
