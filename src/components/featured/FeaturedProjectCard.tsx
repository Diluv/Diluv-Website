import React from "react";
import { Project } from "../../interfaces";
import { listContributors } from "../../utils/util";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import ChartBar from "../icons/ChartBar";
import moment from "moment";
import HourGlass from "../icons/HourGlass";
import Time from "../icons/Time";

function FeaturedProjectCard({ project }: { project: Project }) {

    return <>
        <div className={`grid`} style={{
            gridTemplateAreas: `"image . summary summary summary ." "image . downloads created updated ."`,
            gridTemplateColumns: "6rem 0.5rem auto auto 1fr ",
            gridTemplateRows: `4rem 2rem`
        }}>
            <div className={`w-24 h-24 flex-none`} style={{ gridArea: "image" }}>
                <img src={project.logo}/>
            </div>
            <div className={`flex-grow`} style={{ gridArea: "summary" }}>
                <div className={`mb-1 leading-tight`}>
                    <p>{project.name}</p>
                    <span className={`mr-1`}>
                    by <span>{listContributors(project)}</span>
                </span>
                </div>
                <p className={`text-sm leading-tight`}>
                    {project.summary}
                </p>


            </div>
            <div className={`my-auto text-center mr-2 mt-2`} style={{ gridArea: "downloads" }}>
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


            <div className={`sm:ml-2 lg:ml-0 my-auto text-center mr-2 mt-2`} style={{ gridArea: "created" }}>

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
            <div className={`sm:ml-2 my-auto text-center mr-2 mt-2`} style={{ gridArea: "updated" }}>

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
        </div>
    </>;
}

export default FeaturedProjectCard;