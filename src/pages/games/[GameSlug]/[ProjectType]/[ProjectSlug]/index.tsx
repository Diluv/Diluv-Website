import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { getAuthed } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { HasSession, HasTheme, Project } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import { getTheme } from "../../../../../utils/theme";
import Markdown from "../../../../../components/Markdown";
// @ts-ignore
import { getSession } from "next-auth/client";

export default function ProjectIndex({ theme, project, session }: { project: Project } & HasTheme & HasSession) {
    return (
        <Layout title={project.name} theme={theme} session={session}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <ProjectInfo project={project} pageType={"description"} />
                    <div id={"pageContent"}>
                        <div className={`py-4 px-2`}>
                            <Markdown markdown={project.description} />
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    let theme = getTheme(context);
    let { GameSlug, ProjectType, ProjectSlug } = context.query;

    let session = await getSession(context);
    let data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session: session });
    return {
        props: { theme, project: data.data, session: session ?? null } // will be passed to the page component as props
    };
}
