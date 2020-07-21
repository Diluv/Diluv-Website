import React, { useContext } from "react";
import { Project } from "../../interfaces";
import Link from "next/link";
import { DisplayTag } from "../misc/FilterTag";
import { listContributors, projectHasReleaseStatus, projectHasReviewStatus } from "../../utils/util";
import format from "date-fns/format";
import Alert from "../Alert";
import NavigationMore from "../icons/NavigationMore";
import Download from "../icons/Download";
import Wrench from "../icons/Wrench";
import { Auth } from "../../utils/context";
import GridArea from "../misc/GridArea";

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

    function isSettings(): boolean {
        return pageType === "settings";
    }

    const auth = useContext(Auth);

    return <div id={"topInfo"}>
        {projectHasReleaseStatus(project) && !project.review ?
            <Alert type={"warning"} className={`my-4`}>This project is under review and only people with permission can see it!</Alert> : <></>}
        {projectHasReviewStatus(project) && !project.released ?
            <Alert type={"warning"} className={`my-4`}>This project is not released yet!</Alert> : <></>}

        <div className={`grid mt-4 mb-4 sm:col-gap-4 row-gap-1 justify-center sm:justify-start projectInfoSmall sm:projectInfoMedium`}>
            <GridArea name={`image`}><img src={project.logo} className={`sm:h-48 w-full sm:w-48`}/></GridArea>
            <GridArea name={"name"}><h4 className={`font-semibold`}>{project.name}</h4></GridArea>
            <GridArea name={`authors`} className={`text-gray-600 dark:text-dark-400 mb-1`}>
                                        <span>
                                            {`by `}
                                        </span>
                {listContributors(project)}
            </GridArea>
            <GridArea name={`summary`}>
                <p>
                    {project.summary}
                </p>
            </GridArea>
            <GridArea name={`id`}>
                <p>
                    {`ProjectID: ${project.id}`}
                </p>
            </GridArea>
            <GridArea name={`created`}>
                <p>
                    {`Created at: ${format(project.createdAt, "yyyy-MM-dd HH:mm:ss")}`}
                </p>
            </GridArea>
            <GridArea name={`updated`}>
                <p>
                    {`Updated at: ${format(project.updatedAt, "yyyy-MM-dd HH:mm:ss")}`}
                </p>
            </GridArea>
            <GridArea name={`downloads`}>
                <p>
                    {`${project.downloads} Downloads`}
                </p>
            </GridArea>
            <GridArea name={`tags`} className={`grid my-auto gap-2 grid-cols-tags`}>
                {project.tags.map(value => <DisplayTag tagName={value.name} tagSlug={value.slug} key={value.slug}/>)}
            </GridArea>

            <GridArea name={`download`}>
                <div className={`block py-2`}>
                    <div className={`btn-diluv my-auto mx-auto inline cursor-pointer`}>
                        <Download className={`inline mr-2 text-white fill-current`}/>
                        <span>Download latest file</span>
                    </div>
                </div>
            </GridArea>

        </div>
        <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info mt-4`}>
            {isDescription() ?
                <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                    <span className={`cursor-default select-none text-diluv-600`}>Description</span></div> :
                <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/`}
                      as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/`}>
                    <a>
                        <div className={`px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}>
                            Description
                        </div>
                    </a>

                </Link>}

            {isFiles() ?
                <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                    <span className={`cursor-default select-none text-diluv-600`}>Files</span></div> :
                <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files`}
                      as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}>
                    <a>
                        <div className={`px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}>
                            Files
                        </div>
                    </a>

                </Link>}


            {isMembers() ?
                <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                    <span className={`cursor-default select-none text-diluv-600`}>Members</span></div> :
                <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/members`}
                      as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}>
                    <a>
                        <div className={`px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}>
                            Members
                        </div>
                    </a>

                </Link>}

            {auth.session ? isSettings() ?
                <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-orange-500 hover:border-orange-500 col-start-5`}>
                    <span className={`cursor-default select-none text-orange-600`}>Settings</span></div> :
                <Link href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/settings`}
                      as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`}>
                    <a className={`col-start-5`}>
                        <div className={`px-2 pb-1 -mb-0.125 border-b-2 dark:border-dark-700 hover:border-orange-300 dark-hover:border-orange-700`}>
                            Settings
                        </div>
                    </a>

                </Link> : <> </>}

        </div>
    </div>;
}
