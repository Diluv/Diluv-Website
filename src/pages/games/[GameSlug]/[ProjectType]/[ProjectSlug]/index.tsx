import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "../../../../../utils/request";
import { API_URL, SITE_URL } from "../../../../../utils/api";
import { HasSession, HasTheme, Project } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import { getTheme } from "../../../../../utils/theme";
import Markdown from "../../../../../components/Markdown";
// @ts-ignore
import { getSession } from "next-auth/client";
import Ads from "../../../../../components/ads/Ads";

export default function ProjectIndex({ theme, project, session }: { project: Project } & HasTheme & HasSession): JSX.Element {
    return (
        <Layout
            title={project.name}
            theme={theme}
            session={session}
            canonical={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}`}
            description={`${project.summary}`}
            image={`${project.logo}`}
            url={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}`}
        >
            <div className={`lg:flex flex-row flex-row-reverse`}>
                <div className={`lg:ml-0 mx-auto w-5/6 lg:w-4/6`}>
                    <ProjectInfo project={project} pageType={"description"} />
                    <div id={"pageContent"}>
                        <div className={`py-4 px-2`}>
                            <Markdown markdown={project.description} />
                        </div>
                    </div>
                </div>
                <div className={`w-1/12 lg:w-1/6`}>
                    <Ads/>
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const theme = getTheme(context);
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session: session });
    return {
        props: { theme, project: data.data, session: session ?? null } // will be passed to the page component as props
    };
};
