import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { Project } from "../../../../../interfaces";
import { listContributors } from "../../../../../utils/util";
import { DisplayTag } from "../../../../../components/misc/FilterTag";

export default function ProjectIndex({ project }: { project: Project }) {

    return (
        <Layout title={project.name}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <div id={"topInfo"}>
                        <div className={`grid my-4 grid-cols-3`} style={{ gridTemplateColumns: "8rem 1fr" }}>
                            <img src={project.logo} className={` h-32`}/>
                            <div className={`ml-4 grid`} style={{ gridTemplateRows: "auto auto auto" }}>
                                <div>
                                    <h4 className={`font-semibold`}>{project.name}</h4>
                                    <div className={`text-gray-600`}>
                                        <span>
                                            {`by `}
                                        </span>
                                        {listContributors(project)}
                                    </div>
                                </div>
                                <div>
                                    <p> {project.summary}</p>
                                </div>
                                <div className={`grid my-auto gap-2`} style={{ gridTemplateColumns: "auto auto auto auto 1fr" }}>
                                    {project.tags.map(value => <DisplayTag tagName={value.name} tagSlug={value.slug}/>)}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div id={"pageContent"} className={`my-16`}>
                        <div className={`grid border-b border-gray-500`} style={{ gridTemplateColumns: "auto auto auto auto 1fr" }}>
                            <div className={`p-2 border-l border-t border-r border-b border-gray-500`} style={{marginBottom: "-1px;", borderBottomColor: "white"}}>
                                <p>Description</p>
                            </div>
                            <div className={`p-2 border-t border-r border-gray-500`}>
                                <p>Files</p>
                            </div>
                            <div className={`p-2 border-t border-r border-gray-500`}>
                                <p>Members</p>
                            </div>

                        </div>
                        <div className={`border-l border-r border-b border-gray-500`}>
                            <div className={`w-64 h-64`}/>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}


export async function getServerSideProps(context: NextPageContext) {
    let { GameSlug, ProjectType, ProjectSlug } = context.query;

    let data = await get(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`);
    return {
        props: { project: data.data } // will be passed to the page component as props
    };
}