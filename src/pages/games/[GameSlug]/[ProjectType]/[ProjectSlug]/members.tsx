import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { Project } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";

export default function Files({ project }: { project: Project }) {

    return (
        <Layout title={project.name}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <ProjectInfo project={project} pageType={"members"}/>
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <div className={`w-1/2`}>
                                {project.contributors.map(value => {
                                    return <div key={value.userId} className={`grid col-gap-2 my-1`} style={{gridTemplateAreas: `"avatar name" "avatar role"`, gridTemplateRows: "1.5rem 2.5rem", gridTemplateColumns: "4rem auto"}}>
                                        <img className={`w-16 h-16`} src={value.avatarURL} style={{gridArea: "avatar"}}/>
                                        <p style={{gridArea: "name"}}>
                                            {value.displayName}
                                        </p>
                                        <p style={{gridArea: "role"}}>
                                            Role: {value.role}
                                        </p>
                                    </div>;
                                })}
                            </div>
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