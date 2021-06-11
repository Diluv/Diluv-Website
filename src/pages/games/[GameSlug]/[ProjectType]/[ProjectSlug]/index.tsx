import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "utils/request";
import { API_URL } from "utils/api";
import { Project } from "interfaces";
import ProjectInfo from "components/project/ProjectInfo";
import Markdown from "components/Markdown";
import Ads from "components/ads/Ads";
import { getSession } from "next-auth/client";

export default function ProjectIndex({ project }: { project: Project }): JSX.Element {
    return (
        <Layout
            title={project.name}
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
                    <Ads />
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    return getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session })
        .then((value) => {
            return {
                props: { project: value.data, session } // will be passed to the page component as props
            };
        })
        .catch(() => {
            context.res?.writeHead(302, {
                "Location": `/games/${GameSlug}/${ProjectType}`,
                "Content-Type": "text/html; charset=utf-8"
            });
            context.res?.end();
            return {
                props: { project: null }
            };
        });
};
