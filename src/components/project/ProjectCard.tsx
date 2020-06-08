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

function format(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function ProjectCard({ gameSlug, projectTypeSlug, project, tagFilter, setTagFilter }: Props) {
    let projectUrlRef = `/games/[GameSlug]/[ProjectType]/[ProjectSlug]`;
    let projectUrl = `/games/${gameSlug}/${projectTypeSlug}/${project.slug}`;
    return <>
        <div className={`grid my-4`} style={{
            gridTemplateAreas:
                `"image image image image"
                 "header header header header"
                 "summary summary summary summary"
                 "downloads downloads downloads downloads"
                 "created created created created"
                 "updated updated updated updated"
                 "tag1 tag2 tag3 tag4"
                 `,
            gridTemplateColumns: `auto auto auto auto`,
            gridTemplateRows: `16rem auto auto auto auto auto`
        }}>
            <div style={{ gridArea: "image" }}>
                <Link href={projectUrlRef} as={projectUrl}>
                    <a>
                        <img src={project.logo} className={`mx-auto h-64 w-64`}/>
                    </a>
                </Link>
            </div>

            <div className={"ml-2 leading-snug"} style={{ gridArea: "header" }}>
                <Link href={projectUrlRef} as={projectUrl}>
                    <a>
                        <h4 className={`font-semibold`}>{project.name}</h4>
                    </a>
                </Link>
                <div className={`text-gray-600`}>
                        <span>
                            {`by `}
                        </span>
                    {listContributors(project)}
                </div>
            </div>

            <div className={"ml-2"} style={{ gridArea: "summary" }}>
                <p> {project.summary}</p>
            </div>

            <div className={`ml-2 my-auto text-center mr-2`} style={{ gridArea: "downloads" }}>
                <Tippy content={<div className={`bg-gray-800 border border-gray-900 text-white opacity-90 p-1 text-center`}>
                    <p>
                        {project.downloads} Downloads
                    </p>
                </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                    <div className={`flex mx-auto`}>
                        <ChartBar className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                        <span className={`cursor-default`}>
                                {project.downloads}
                            </span>
                    </div>
                </Tippy>
            </div>

            <div className={`my-auto text-center mr-2`} style={{ gridArea: "created" }}>
                <Tippy content={<div className={`bg-gray-800 border border-gray-900 text-white opacity-90 p-1 text-center`}>
                    <p>
                        Created On
                    </p>
                    <p>{moment(project.createdAt).format("MMMM Do YYYY")}</p>
                </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                    <div className={`flex mx-auto`}>
                        <HourGlass className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                        <span className={`cursor-default`}>
                                {moment(project.createdAt).fromNow()}
                            </span>
                    </div>
                </Tippy>
            </div>
            <div className={`my-auto text-center mr-2`} style={{ gridArea: "updated" }}>
                <Tippy content={<div className={`bg-gray-800 border border-gray-900 text-white opacity-90 p-1 text-center`}>
                    <p>
                        Updated On
                    </p>
                    <p>{moment(project.updatedAt).format("MMMM Do YYYY")}</p>
                </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                    <div className={`flex mx-auto`}>
                        <Time className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                        <span className={`cursor-default`}>
                                {moment(project.updatedAt).fromNow()}
                            </span>
                    </div>
                </Tippy>
            </div>

                {project.tags.map((value, i) => <div className={`my-auto cursor-default text-center`} key={value.slug} style={{ gridArea: `tag${i+1}` }}>
                    <FilterTag tagSlug={value.slug} tagName={value.name} tagFilter={tagFilter}
                               setTagFilter={setTagFilter}/></div>)}


        </div>
    </>;
}

export default ProjectCard;
