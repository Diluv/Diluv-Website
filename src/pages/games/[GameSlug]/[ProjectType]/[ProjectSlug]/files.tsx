import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { Project } from "../../../../../interfaces";
import ReactMarkdown from "react-markdown";
import ProjectInfo from "../../../../../components/project/ProjectInfo";

export default function Files({ project }: { project: Project }) {

    return (
        <Layout title={project.name}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <ProjectInfo project={project} pageType={"files"}/>
                    <div id={"pageContent"}>
                        <div className={`p-4`}>
                            files here
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