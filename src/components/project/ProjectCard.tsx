import React from "react";
import { Project, SelectData } from "../../interfaces";
import Link from "next/link";
import Tag from "../misc/Tag";
import moment from "moment";
import HourGlass from "../icons/HourGlass";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import Time from "../icons/Time";
import ChartBar from "../icons/ChartBar";

const ago = require("s-ago");

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

function makeTooltip() {
}

function listContributors(project: Project) {
    let arr = [];
    let count = 0;
    for (let contributor of project.contributors) {
        count++;
        arr.push(<span key={contributor.username}>
      <Link href={`/author/${contributor.username}/`}>
        <a
            className={"hover:text-diluv-500"}>{contributor.username}</a>
      </Link>
            {(count) !== project.contributors.length && <span className={"mr-1"}>,</span>}
    </span>);
    }
    return arr;
}

function ProjectCard({ gameSlug, projectTypeSlug, project, tagFilter, setTagFilter }: Props) {
    let projectUrlRef = `/games/[GameSlug]/[ProjectType]/[ProjectSlug]`;
    let projectUrl = `/games/${gameSlug}/${projectTypeSlug}/${project.slug}`;
    return <>
        <div className={`grid my-4 grid-cols-3`} style={{ gridTemplateColumns: "8rem 1fr" }}>
            <Link href={projectUrlRef} as={projectUrl}>
                <a>
                    <img src={project.logo} className={` h-32`}/>
                </a>
            </Link>
            <div className={`ml-4 grid`} style={{ gridTemplateRows: "0.5fr 0.75fr 0.5fr" }}>
                <div>
                    <Link href={projectUrlRef} as={projectUrl}>
                        <a>
                            <h4 className={`font-semibold`}>{project.name}</h4>
                        </a>
                    </Link>
                    <span className={`text-gray-600`}>
                    by {listContributors(project)}
                </span>
                </div>
                <div>
                    <p> {project.summary}</p>
                </div>
                <div className={`grid gap-4`} style={{ gridTemplateColumns: "auto auto auto auto 1fr" }}>
                    <div className={`my-auto text-center`}>
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
                    <div className={`my-auto text-center`}>
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
                    <div className={`my-auto text-center`}>
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

                    <div className={`my-auto text-center`}>
                        <div className={`grid cursor-default`} style={{ gridTemplateColumns: "auto auto auto auto" }}>
                            {project.tags.map(value => <Tag key={value.slug} tagSlug={value.slug} tagName={value.name} tagFilter={tagFilter}
                                                            setTagFilter={setTagFilter}/>)}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </>;
}

export default ProjectCard;
